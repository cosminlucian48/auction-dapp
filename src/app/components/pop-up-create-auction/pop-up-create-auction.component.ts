import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
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

  profileForm = new FormGroup({
    nameItem: new FormControl(''),
    deploymentTime: new FormControl(''),
    initialBid: new FormControl('')
  });
  modalService: any;

  async onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
    if (this.auctionFactoryContract != null) {
      const res = await this.pinataService.pinFileToIPFS(this.file);
      if (res) {
        console.log("axios:", res);
        const uri = {image:res.image, name:this.profileForm.controls['nameItem'].value};
        console.log({URI:uri});
        console.log(this.metamaskService.getAccount());
        this.nftContract.mintNFT(JSON.stringify(uri), { from: this.metamaskService.getAccount() }).then((res_mint: any) => {
          // console.log({Mint:res.value.toString()});
          // console.log({Mint:res});
          res_mint.wait().then((r: any) => {
            this.nftId = parseInt(r.logs[0].topics[3], 16);
            // console.log({benefurau:this.metamaskService.getAccount()});
            console.log("NFT ID", this.nftId);
            this.auctionToBeCreated = this.auctionFactoryContract.newAuction(
              this.nftId,
              this.profileForm.controls['nameItem'].value,
              this.profileForm.controls['initialBid'].value,
              // adauga aici pt poza
              this.profileForm.controls['deploymentTime'].value,
              this.metamaskService.getAccount(),
              { from: this.metamaskService.getAccount() }).then(
                (responseBid: any) => {
                  responseBid.wait().then(() => {
                    this.close();
                  })
                }).catch((error: any) => {
                  console.log({ error_new_acti: error });
                });
            if (this.auctionToBeCreated) {

              console.log("Licitatia noua:", this.auctionToBeCreated);
            }
            console.log({ nftId: this.nftId });
          }).catch((err2: any) => {
            console.log({ error: err2 });
          })
        }).catch((err: any) => {
          console.log({ error: err });
        });
        this.nftContract.balanceOf(this.metamaskService.getAccount()).then((reS: any) => {
          console.log({ balancE: reS.toString() });
        })



      }

    }
  }


  constructor(public metamaskService: MetamaskService, public dialogRef: MatDialogRef<LandingPageComponent>, private route: Router, public pinataService: PinataService
  ) { }

  close(): void {
    this.dialogRef.close();
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }
  ngOnInit(): void {
    this.auctionFactoryContract = this.metamaskService.getAuctionFactory();
    this.nftContract = this.metamaskService.getNFTContract();
    console.log("Auction factory in dialog:", this.auctionFactoryContract)
  }

}
