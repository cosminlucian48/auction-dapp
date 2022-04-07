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
  private ethPrecision = 10 ** 18;
  constructor(
    public metamaskService: MetamaskService,
    private router: Router) { }

  async ngOnInit() {
    const datepipe: DatePipe = new DatePipe('en-US');
    this.nftContract = this.metamaskService.getNFTContract();
    this.signer = this.metamaskService.getSigner();

    this.auction.getItemEndTime().then(
      (response: number) => {

        var d = new Date(0);
        d.setUTCSeconds(response);
        const now = new Date();
        this.timeDifference = (d.getTime() - now.getTime()) + 10000;
        const source = timer(+this.timeDifference);
        // console.log({ time_dif: this.timeDifference });
        // console.log(source);
        // this.auction.getTotalBalanceOfContract().then((res: number) => {
        //   // console.log({ banicontract: res / this.ethPrecision });
        // }).catch((erR: any) => {
        //   console.log(erR);
        // });
        // this.auction.getBeneficiary().then((res: any) => {
        //   // console.log("BENEF:", res);
        // })


        const subscribe = source.subscribe(val => {
          console.log({ subscribe: val });
          this.stillLive = false;
        });

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
    this.auction.senderPendingReturns({ from: this.metamaskService.getAccount() }).then((response: number) => {
      this.pendingReturnForUser = (response / this.ethPrecision).toString();
    })

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

    // nft.ownerOf(1).then((res:any)=>{
    //   console.log("OWENER:",res);
    //   nft["safeTransferFrom(address,address,uint256)"](res, "0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199", 1).then((r:any)=>{
    //     console.log({transfer:r});
    //     nft.ownerOf(1).then((res2:any)=>{
    //       console.log({ownernouw:res2})
    //     }).catch((er:any)=>{
    //       console.log({erownernou:er})
    //     })
    //   }).catch((vai:any)=>{
    //     console.log({erlatransfer:vai})
    //   })
    // }).catch((err:any) =>{
    //   console.log({error_owner:err})
    // })
    // }

  }

  async bidOnAuction() {
    const account = this.metamaskService.getAccount();
    if (this.bidValue != 0) {
      this.auction.bid({ from: account, value: ethers.utils.parseEther(this.bidValue.toString()) }).then(
        (responseBid: any) => {
          console.log("Bid placed succesfully.", responseBid);
          responseBid.wait().then(() => {
            this.itemHighestBidd = this.bidValue.toString();
          })
        }
      ).catch(
        (error: any) => {
          console.log(error);
        }
      );
    }

    // if(mere){
    //   console.log("MERE?:",mere);
    // }
  }
  withdrawFromAuction() {
    const account = this.metamaskService.getAccount();
    this.auction.withdraw({ from: account }).then((response: boolean) => {
      if (response) {
        console.log("daca taci sa taci");
        this.pendingReturnForUser = 0;
      }
      else {
        console.log("ok")
      }
    })
  }

  endAuction() {
    const acount = this.metamaskService.getAccount();
    this.auction.getBeneficiary().then((beneficiary: any) => {
      // console.log("BENEF:", res);
      this.auction.auctionEnd().then(() => {
        console.log("S-o terminat lciitatia.");
        this.auction.fHighestBiddder().then((highestBidder: any) => {
          console.log({highestBidder,beneficiary,id:this.nftId});
          this.nftContract.transferNft(beneficiary, highestBidder, this.nftId, {from:beneficiary}).then((r:any)=>{
            console.log("S-o facut ", r);
            
          }).catch((err:any)=>{
            console.log({err});
          })
          // this.nftContract["approve(address,uint256)"](highestBidder, this.nftId,{from:beneficiary}).then((approve: any) => {
          //   console.log({ Approve: approve });
          //   this.nftContract["safeTransferFrom(address,address,uint256)"](beneficiary, highestBidder, this.nftId, {from:beneficiary}).then((r: any) => {

          //     console.log({ transfer: r });
          //     this.nftContract.ownerOf(this.nftId).then((res2: any) => {
          //       console.log({ ownernouw: res2 });
          //       //to do, de schimbat owneru si in map
          //     }).catch((er: any) => {
          //       console.log({ erownernou: er })
          //     });
          //   }).catch((vai: any) => {
          //     console.log({ erlatransfer: vai })
          //   })
          // }).catch((err_approve: any) => {
          //   console.log({ err_approve });
          // })

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


