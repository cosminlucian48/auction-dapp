import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LandingPageComponent } from 'src/app/pages/landing-page/landing-page.component';
import { MetamaskService } from 'src/app/services/metamask.service';
import { PinataService } from 'src/app/services/pinata.service';
import addresses from '../../../../environment/contract-address.json';

@Component({
  selector: 'app-pop-up-create-nft',
  templateUrl: './pop-up-create-nft.component.html',
  styleUrls: ['./pop-up-create-nft.component.css']
})
export class PopUpCreateNftComponent implements OnInit {
  auctionFactoryContract: any;
  auctionToBeCreated: any;
  srcResult: any;
  file: any;
  nftContract: any;
  nftId: any;

  profileForm = new FormGroup({
    nameItem: new FormControl('')
  });
  modalService: any;

  async onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
    if (this.auctionFactoryContract != null) {
      const res = await this.pinataService.pinFileToIPFS(this.file);
      if (res) {
        console.log("axios:", res);
        const uri = { image: res.image, name: this.profileForm.controls['nameItem'].value };
        console.log({ URI: uri });
        console.log(this.metamaskService.getAccount());
        this.nftContract.mintNFT(JSON.stringify(uri), { from: this.metamaskService.getAccount() }).then((res_mint: any) => {
          res_mint.wait().then((r: any) => {
            //id nft
            this.nftId = parseInt(r.logs[0].topics[3], 16);
            console.log({ nftId: this.nftId });
            this.close();
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


