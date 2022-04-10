import { Component, OnInit, Input } from '@angular/core';
import { MetamaskService } from '../../services/metamask.service';
import { ethers } from 'ethers';
import { DatePipe } from '@angular/common';
import { timer } from 'rxjs';
import addresses from '../../../../environment/contract-address.json';
import Auction from '../../../../blockchain/artifacts/blockchain/contracts/Auction.sol/Auction.json';
import AuctionNFT from '../../../../blockchain/artifacts/blockchain/contracts/AuctionNFT.sol/AuctionNFT.json';
import AuctionFactory from '../../../../blockchain/artifacts/blockchain/contracts/AuctionFactory.sol/AuctionFactory.json';
import { Meta } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-auction-box',
  templateUrl: './auction-box.component.html',
  styleUrls: ['./auction-box.component.css']
})
export class AuctionBoxComponent implements OnInit {

  auctionFactoryContract: any;
  nftContract: any;
  @Input() auction: any;
  signer: any;
  itemName: any;
  itemHighestBidd: any;
  itemHighestBidder: any;
  itemEndTime: any;
  stillLive: boolean = true;
  itemInitialBid: any;
  auctionNftAddress: any;
  bidValue: number = 0;
  pendingReturnForUser: any;
  pinataUrl: any;
  timeDifference: any;
  timer: any;
  nft: any;
  nftUri: any;
  imageUrl: any;
  nftId: any;
  isSeller:boolean = false;
  private ethPrecision = 10 ** 18;
  constructor(
    public metamaskService: MetamaskService,
    private router: Router,
    public notifier: NotifierService) { }

  async ngOnInit() {
    const datepipe: DatePipe = new DatePipe('en-US');
    this.nftContract = this.metamaskService.getNFTContract();
    this.signer = this.metamaskService.getSigner();

    //preiau endtime
    this.auction.getItemEndTime().then(
      (response: number) => {
        var d = new Date(0);
        d.setUTCSeconds(response);
        const now = new Date();
        this.timeDifference = (d.getTime() - now.getTime()) + 10000;
        const source = timer(+this.timeDifference);
        const subscribe = source.subscribe(val => {
          console.log({ subscribe: val });
          this.stillLive = false;
        });

        this.itemEndTime = d.toLocaleString();
      }).catch((error: any) => {
        alert("Error when retrieving item name.")
      });

    //preiau beneficiarul
    this.auction.getBeneficiary().then((benef:any)=>{
      console.log(benef.toString())
      console.log(this.metamaskService.getAccount().toString())
      console.log(benef.toString().toLowerCase().localeCompare(this.metamaskService.getAccount().toString().toLowerCase()))
      if(benef.toString().toLowerCase().localeCompare(this.metamaskService.getAccount().toString().toLowerCase())==0){
        this.isSeller = true;
      }
    }).catch((err_benef:any)=>{
      console.log({err_benef})
    })

    //preiau numele nft ului
    this.auction.getItemName().then(
      (response: string) => {
        this.itemName = response;
      }).catch((error: any) => {
        alert("Error when retrieving item name.")
      });

    //preiau highetbid
    this.auction.fHighestBid().then(
      (response: number) => {
        this.itemHighestBidd = response / this.ethPrecision;
      }).catch((error: any) => {
        {
          alert("Error when retrieving highest bid.")
        }
      });
    
    //preiau highest bidderul
    this.auction.fHighestBiddder().then(
      (response: string) => {
        this.itemHighestBidder = response;
      }).catch((error: any) => {
        {
          alert("Error when retrieving highest bidder.")
        }
      });

    //preiau bidul initial
    this.auction.getInitialBid().then(
      (response: string) => {
        this.itemInitialBid = parseInt(response)/this.ethPrecision;
      }).catch((error: any) => {
        {
          alert("Error when retrieving initial bidd.");
        }
      });

    //preiau pending returns pt useru de pe metamask
    this.auction.senderPendingReturns({ from: this.metamaskService.getAccount() }).then((response: number) => {
      this.pendingReturnForUser = (response / this.ethPrecision).toString();
    })

    //preiau id ul nft ului
    this.auction.getNFTId().then((res: any) => {
      console.log({ nft_id: res.toString() });
      this.nftId = res.toString();
      this.nftContract.tokenURI(res.toString()).then((res_uri: any) => {
        // console.log(JSON.parse(res_uri));
        this.nftUri = JSON.parse(res_uri);
        this.imageUrl = this.nftUri.image;
      }).catch((err_uri: any) => {
        console.log({ error: err_uri });
      })
    }).catch((err: any) => {
      console.log({ error: err });
    })
  }

  async bidOnAuction() {
    const account = this.metamaskService.getAccount();
    if (this.bidValue != 0) {
      this.auction.bid({ from: account, value: ethers.utils.parseEther(this.bidValue.toString()) }).then(
        (responseBid: any) => {
          this.notifier.notify("success","Bid succesfully.");
          console.log("Bid placed succesfully.", responseBid);
          responseBid.wait().then(() => {
            this.itemHighestBidd = this.bidValue.toString();
          })
        }
      ).catch(
        (error: any) => {
          this.notifier.notify("error","Bidul nu a fost creat");
          console.log(error);
        }
      );
    }
  }

  withdrawFromAuction() {
    const account = this.metamaskService.getAccount();
    this.auction.withdraw({ from: account }).then((response: boolean) => {
      if (response) {
        this.notifier.notify("success","Withdraw successfully");
        this.pendingReturnForUser = 0;
      }
      else {
        console.log("ok");
        this.notifier.notify("error","Withdraw unsuccessfully");
      }
    })
  }

  endAuction() {
    const acount = this.metamaskService.getAccount();
    this.auction.getBeneficiary().then((beneficiary: any) => {
      // console.log("BENEF:", res);
      this.auction.auctionEnd().then(() => {
        //cui sa i se transfere nft ul
        this.auction.fHighestBiddder().then((highestBidder: any) => {
          this.nftContract.transferNft(beneficiary, highestBidder, this.nftId, {from:beneficiary}).then((r:any)=>{
            this.notifier.notify("success","Nft transfered.");
          }).catch((err:any)=>{
            this.notifier.notify("error","Licitatia nu s-a terminat");
            console.log({err});
          })
        }).catch((error_hbidder: any) => {
          console.log({ error_hbidder });
        });

      }).catch((err: any) => {
        console.log({ error_owner: err })
      });
    }).catch((erro: any) => {
      console.log({ error: erro })
    });
  }
}


