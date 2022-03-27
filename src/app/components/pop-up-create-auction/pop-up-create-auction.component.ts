import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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

  async onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
    if(this.auctionFactoryContract!=null){
      this.auctionToBeCreated = await this.auctionFactoryContract.newAuction(
        this.profileForm.controls['nameItem'].value,
        this.profileForm.controls['initialBid'].value,
        this.profileForm.controls['deploymentTime'].value*3600);
  
      if(this.auctionToBeCreated){
        
        console.log("Licitatia noua:", this.auctionToBeCreated);
      }
    }
  }
  constructor(public metamaskService:MetamaskService) { }

  ngOnInit(): void {
    this.auctionFactoryContract = this.metamaskService.getAuctionFactory();
    console.log("Auction factory in dialog:", this.auctionFactoryContract)
  }

}
