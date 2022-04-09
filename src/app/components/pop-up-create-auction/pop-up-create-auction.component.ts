import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ethers } from 'ethers';
import { LandingPageComponent } from 'src/app/pages/landing-page/landing-page.component';
import { MetamaskService } from 'src/app/services/metamask.service';
import { PinataService } from 'src/app/services/pinata.service';
import addresses from '../../../../environment/contract-address.json';

@Component({
  selector: 'app-pop-up-create-auction',
  templateUrl: './pop-up-create-auction.component.html',
  styleUrls: ['./pop-up-create-auction.component.css']
})
export class PopUpCreateAuctionComponent implements OnInit {
  auctionFactoryContract: any;
  auctionToBeCreated: any;
  srcResult: any;
  file: any;
  nftContract: any;
  nftId: any;
  NFT: any;
  itemName: any;
  userIsOwner:any;
  profileForm = new FormGroup({
    deploymentTime: new FormControl(''),
    initialBid: new FormControl('')
  });
  modalService: any;
  constructor(public metamaskService: MetamaskService,  public dialogRef: MatDialogRef<LandingPageComponent>, @Inject(MAT_DIALOG_DATA) public data: { nftId: any }, private route: Router, public pinataService: PinataService,
  public notifier:NotifierService) { }

  async onSubmit() {
    this.NFT = this.metamaskService.getNFTContract();
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);

    this.NFT['tokenURI(uint256)'](this.nftId).then((res: any) => {
      console.log({ URI: JSON.parse(res) });
      this.itemName = JSON.parse(res).name;
      if (this.auctionFactoryContract != null) {
        console.log(this.profileForm.controls['initialBid'].value);
        this.auctionToBeCreated = this.auctionFactoryContract.newAuction(
          this.nftId,
          this.itemName,
          ethers.utils.parseEther(this.profileForm.controls['initialBid'].value),
          this.profileForm.controls['deploymentTime'].value,
          { from: this.metamaskService.getAccount() }).then(
            (responseBid: any) => {
              responseBid.wait().then(() => {
                this.notifier.notify("success","Licitatia a fost creata");
                this.close();
              })
            }).catch((error: any) => {

              console.log({ error_new_acti: error });
              this.notifier.notify("error","Licitatia nu a fost creata");
            });
        if (this.auctionToBeCreated) {

          console.log("Licitatia noua:", this.auctionToBeCreated);
        }
        console.log({ nftId: this.nftId });


        this.nftContract.balanceOf(this.metamaskService.getAccount()).then((reS: any) => {
          console.log({ balancE: reS.toString() });
        })

      }
    }).catch((err: any) => {
      console.log({ error_uri: err })
    })
  }

  close(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.nftId = this.data.nftId;
    console.log(this.nftId.toString());
    this.auctionFactoryContract = this.metamaskService.getAuctionFactory();
    this.nftContract = this.metamaskService.getNFTContract();
    console.log("Auction factory in dialog:", this.auctionFactoryContract)
  }

}


