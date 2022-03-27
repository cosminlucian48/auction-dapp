
import { Component, OnInit, Input } from '@angular/core';
import { MetamaskService } from '../../services/metamask.service';
import { ethers } from 'ethers';
import { DatePipe } from '@angular/common';

import addresses from '../../../../environment/contract-address.json';
import Auction from '../../../../blockchain/artifacts/blockchain/contracts/Auction.sol/Auction.json';
import AuctionFactory from '../../../../blockchain/artifacts/blockchain/contracts/AuctionFactory.sol/AuctionFactory.json';
import { Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-auction-box',
  templateUrl: './auction-box.component.html',
  styleUrls: ['./auction-box.component.css']
})
export class AuctionBoxComponent implements OnInit {

  auctionFactoryContract: any;
  @Input() auctionAddress: any;
  auction: any;
  signer: any;
  itemName: any;
  itemHighestBidd: any;
  itemHighestBidder: any;
  itemEndTime: any;
  itemInitialBid: any;
  bidValue:number=0;

  private ethPrecision = 10 ** 18;
  constructor(public metamaskService: MetamaskService) { }

  async ngOnInit() {
    const datepipe: DatePipe = new DatePipe('en-US');

    this.signer = this.metamaskService.getSigner();
    this.auction = new ethers.Contract(this.auctionAddress, Auction.abi, this.signer);
    
    this.auction.getItemEndTime().then(
      (response: number) => {
        var d = new Date(0);
        d.setUTCSeconds(response);
        this.itemEndTime = d.toLocaleString();
      }).catch((error: any) => {
        alert("Error when retrieving item name.")
      });

    // this.itemName = await this.auction.getItemName();
    // this.itemHighestBidd = await this.auction.fHighestBid();
    // this.itemHighestBidder = await this.auction.fHighestBiddder();
    // this.itemInitialBid = await this.auction.fInitialHighestBid();
    this.auction.getItemName().then(
      (response: string) => {
        this.itemName = response;
      }).catch((error: any) => {
        alert("Error when retrieving item name.")
      });
    this.auction.fHighestBid().then(
      (response: number) => {
        this.itemHighestBidd = response / this.ethPrecision;
      }).catch((error: any) => {
        {
          alert("Error when retrieving highest bid.")
        }
      });
    this.auction.fHighestBiddder().then(
      (response: string) => {
        this.itemHighestBidder = response;
      }).catch((error: any) => {
        {
          alert("Error when retrieving highest bidder.")
        }
      });
    this.auction.fInitialHighestBid().then(
      (response: string) => {
        this.itemInitialBid = response;
      }).catch((error: any) => {
        {
          alert("Error when retrieving initial bidd.");
        }
      });

    // let dateTime= new Date().getTime() / 1000;
    // this.auctionFactoryContract = new ethers.ContractFactory( Auction.abi,Auction.bytecode,this.signer);

    // const ceva = await this.auctionFactoryContract.deploy( 10, 'Ana');
    // console.log(await ceva.getItemName(), ceva.address);

    // const ceva2 = await this.auctionFactoryContract.deploy( 100, 'Marian');
    // console.log(await ceva2.getItemName(), ceva2.address);

    // const signer = this.metamaskService.getSigner();
    // console.log("Singner:", signer);
    // if(signer){
    //   const contract_address = await this.auctionFactoryContract.checkAuction(0);
    //   if(contract_address){
    //     console.log(contract_address)
    //     this.aucc = new ethers.Contract(contract_address, Auction.abi, signer);
    //     console.log(await this.aucc.getItemName());
    //     // console.log(this.auctionFactoryContract)
    //   }
    // }




  }

  async bidOnAuction(){
    const account = this.metamaskService.getAccount();
    if(this.bidValue!=0){
      this.auction.bid({ from: account, value:  ethers.utils.parseEther(this.bidValue.toString()) }).then(
        ()=>{
          console.log("Bid placed succesfully.");
        }
      ).catch(
        (error:any)=>{
          alert("Error when palcing the bid.")
        }
      );
    }
    // if(mere){
    //   console.log("MERE?:",mere);
    // }
  }


}
