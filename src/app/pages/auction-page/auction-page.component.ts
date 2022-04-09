import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ethers } from 'ethers';
import { MetamaskService } from 'src/app/services/metamask.service';
import Auction from '../../../../blockchain/artifacts/blockchain/contracts/Auction.sol/Auction.json';
import AuctionNFT from '../../../../blockchain/artifacts/blockchain/contracts/AuctionNFT.sol/AuctionNFT.json';

@Component({
  selector: 'app-auction-page',
  templateUrl: './auction-page.component.html',
  styleUrls: ['./auction-page.component.css']
})
export class AuctionPageComponent implements OnInit {

  auctionsAddresses: any;
  auctionFactoryContract: any;
  nftContract: any;
  signer: any;
  auctions: Array<any> = new Array();
  constructor(private route: Router, public metamaskService: MetamaskService) { }

  ngOnInit(): void {
    this.auctionFactoryContract = this.metamaskService.getAuctionFactory();
    this.nftContract = this.metamaskService.getNFTContract();
    this.signer = this.metamaskService.getSigner();
    if (this.auctionFactoryContract == null) {
      console.log("Am intrat");
      this.metamaskService.createAuctionFactoryContractInstance().then(
        (response: boolean) => {
          if (response) {
            this.getAddresses();
          }
        }).catch((error: any) => {
          alert("Error ciudat rau de tot.")
        });
    } else {
      this.getAddresses();
    }
  }

  getAddresses() {
    this.signer = this.metamaskService.getSigner();
    const actualDate = new Date();
    this.auctionFactoryContract = this.metamaskService.getAuctionFactory();
    if (this.auctionFactoryContract) {
      this.auctionFactoryContract.getAllAuctionsAddresses().then(
        (response: string) => {
          console.log("Addresses:", response);
          this.auctionsAddresses = response;
          this.auctionsAddresses.forEach((element: any) => {
            var auction: any = new ethers.Contract(element, Auction.abi, this.signer);

            auction.getTotalBalanceOfContract().then((balance: any) => {
              console.log("Total balance:", parseInt(balance.toString()));
              auction.getItemEndTime().then((endTime: number) => {
                var d = new Date(0);
                d.setUTCSeconds(endTime);
                if (parseInt(balance.toString()) > 0 ||  d.getTime() > actualDate.getTime()) {
                  this.auctions.push(auction);
                }
              }).catch((err_time: any) => {
                alert("Error when retrieving Auction end time");
              })
            }).catch((err_balance: any) => {
              console.log({ err_balance });
            })

          })
        }).catch((error: any) => {
          alert("Error when retrieving item name.")
          console.log({ getAddresses: error });
        });
    }
  }
  back() {
    this.route.navigateByUrl("");
  }
}
