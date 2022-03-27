import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MetamaskService } from 'src/app/services/metamask.service';

@Component({
  selector: 'app-auction-page',
  templateUrl: './auction-page.component.html',
  styleUrls: ['./auction-page.component.css']
})
export class AuctionPageComponent implements OnInit {

  auctionsAddresses:any;
  auctionFactoryContract:any;
  signer:any;
  constructor(private route: Router,public metamaskService:MetamaskService) { }

  ngOnInit():void {
    this.auctionFactoryContract = this.metamaskService.getAuctionFactory();
    this.signer = this.metamaskService.getSigner();
    if(this.auctionFactoryContract==null){
      console.log("Am intrat");
      this.metamaskService.createAuctionFactoryContractInstance().then(
        (response:boolean) =>{
        if(response){
          this.getAddresses();
        }
      }).catch((error:any) =>{
        alert("Error ciudat rau de tot.")
      });
    }else{
      this.getAddresses();
    }
    console.log("De ce:",this.auctionFactoryContract);
    

    


    // this.auctionsAddresses = await this.auctionFactoryContract.getAllAuctionsAddresses();
    // if(this.auctionsAddresses){
    //   console.log(this.auctionsAddresses);
    // }
    
  }
  getAddresses(){
    this.auctionFactoryContract = this.metamaskService.getAuctionFactory();
          if(this.auctionFactoryContract){
            this.auctionFactoryContract.getAllAuctionsAddresses().then(
              (response: string) => {
                console.log("Addresses:",response);
                this.auctionsAddresses = response;
              }).catch((error: any) => {
                alert("Error when retrieving item name.")
              });
          }
  }


  back(){
    this.route.navigateByUrl("");
  }
}
