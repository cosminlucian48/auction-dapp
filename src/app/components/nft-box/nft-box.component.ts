import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ethers } from 'ethers';
import { MetamaskService } from 'src/app/services/metamask.service';
import AuctionNFT from '../../../../blockchain/artifacts/blockchain/contracts/AuctionNFT.sol/AuctionNFT.json';
import { PopUpCreateAuctionComponent } from '../pop-up-create-auction/pop-up-create-auction.component';

@Component({
  selector: 'app-nft-box',
  templateUrl: './nft-box.component.html',
  styleUrls: ['./nft-box.component.css']
})
export class NftBoxComponent implements OnInit {

  pinataUrl:any;
  itemName:any;
  @Input() nftId:any;
  signer:any;
  NFT:any;
  constructor(public metamaskService:MetamaskService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.signer = this.metamaskService.getSigner();
    this.NFT = this.metamaskService.getNFTContract();
    this.NFT['tokenURI(uint256)'](this.nftId).then((res:any)=>{
      this.NFT['ownerOf(uint256)'](this.nftId).then((r:any)=>{
        console.log(r);
      })
      console.log({URI:JSON.parse(res)});
      this.pinataUrl = JSON.parse(res).image;
      this.itemName = JSON.parse(res).name;
    }).catch((err:any)=>{
      console.log({error_uri:err})
    });
    this.NFT.getSmt({from:this.metamaskService.getAccount()}).then((r:any)=>{
      console.log(r.toString());
    })
    

  }
  auctionNft(){
    const dialogRef = this.dialog.open(PopUpCreateAuctionComponent, {
      data:{nftId: this.nftId}
    });
  }
}


