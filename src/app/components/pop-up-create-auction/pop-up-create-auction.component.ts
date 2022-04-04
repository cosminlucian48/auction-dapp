import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LandingPageComponent } from 'src/app/pages/landing-page/landing-page.component';
import { MetamaskService } from 'src/app/services/metamask.service';
import { PinataService } from 'src/app/services/pinata.service';

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
      console.log("axios:",res);
      if (res) {

        this.auctionToBeCreated = this.auctionFactoryContract.newAuction(
          this.profileForm.controls['nameItem'].value,
          this.profileForm.controls['initialBid'].value,
          // adauga aici pt poza
          this.profileForm.controls['deploymentTime'].value,
          this.metamaskService.getAccount(),
          res,
          res.pinataUrl).then(
            (responseBid: any) => {
              responseBid.wait().then(() => {
                this.close();
              })
            }).catch((error: any) => {
              console.log(error);
            });




        if (this.auctionToBeCreated) {

          console.log("Licitatia noua:", this.auctionToBeCreated);
        }
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
    console.log("Auction factory in dialog:", this.auctionFactoryContract)
  }

}
