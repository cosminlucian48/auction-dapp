import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LandingPageComponent } from 'src/app/pages/landing-page/landing-page.component';
import { MetamaskService } from 'src/app/services/metamask.service';

@Component({
  selector: 'app-pop-up-create-auction',
  templateUrl: './pop-up-create-auction.component.html',
  styleUrls: ['./pop-up-create-auction.component.css']
})
export class PopUpCreateAuctionComponent implements OnInit {
  auctionFactoryContract:any;
  auctionToBeCreated:any;

  profileForm = new FormGroup({
    nameItem: new FormControl(''),
    deploymentTime: new FormControl(''),
    initialBid: new FormControl('')
  });
  modalService: any;

  async onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
    if(this.auctionFactoryContract!=null){
      this.auctionToBeCreated = this.auctionFactoryContract.newAuction(
        this.profileForm.controls['nameItem'].value,
        this.profileForm.controls['initialBid'].value,
        this.profileForm.controls['deploymentTime'].value*3600).then(
          (responseBid:any) => {
            responseBid.wait().then(() => {
              this.close();
            })
        });

      if(this.auctionToBeCreated){

        console.log("Licitatia noua:", this.auctionToBeCreated);
      }
    }
  }


  constructor(public metamaskService:MetamaskService, public dialogRef: MatDialogRef<LandingPageComponent>, private route: Router
  ) { }

  close(): void {
    this.dialogRef.close();
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      // reader.onload = (e: any) => {
      //   this.srcResult = e.target.result;
      // };

      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }
  ngOnInit(): void {
    this.auctionFactoryContract = this.metamaskService.getAuctionFactory();
    console.log("Auction factory in dialog:", this.auctionFactoryContract)
  }

}
