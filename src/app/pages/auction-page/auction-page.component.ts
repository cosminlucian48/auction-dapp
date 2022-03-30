import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ethers } from 'ethers';
import { MetamaskService } from 'src/app/services/metamask.service';
import Auction from '../../../../blockchain/artifacts/blockchain/contracts/Auction.sol/Auction.json';

@Component({
  selector: 'app-auction-page',
  templateUrl: './auction-page.component.html',
  styleUrls: ['./auction-page.component.css']
})
export class AuctionPageComponent implements OnInit {

  auctionsAddresses:any;
  auctionFactoryContract:any;
  signer:any;
  auctions: Array<any> = new Array;
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
    this.signer = this.metamaskService.getSigner();
    const actualDate = new Date();
    this.auctionFactoryContract = this.metamaskService.getAuctionFactory();
          if(this.auctionFactoryContract){
            this.auctionFactoryContract.getAllAuctionsAddresses().then(
              (response: string) => {
                console.log("Addresses:",response);
                this.auctionsAddresses = response;
                this.auctionsAddresses.forEach((element: any) =>{
                  var auction : any = new ethers.Contract(element, Auction.abi, this.signer);
                  auction.getItemEndTime().then((response: number) => {
                    var d = new Date(0);
                    d.setUTCSeconds(response);
                    if(d.getTime() > actualDate.getTime()){
                      this.auctions.push(auction);
                    }
                  }).catch((error:any) => {
                    alert("Error when retrieving Auction end time");
                  });

                })
              }).catch((error: any) => {
                alert("Error when retrieving item name.")
              });
          }
  }


  back(){
    this.route.navigateByUrl("");
  }
}
