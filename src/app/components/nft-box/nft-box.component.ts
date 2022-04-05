import { Component, Input, OnInit } from '@angular/core';
import { ethers } from 'ethers';
import { MetamaskService } from 'src/app/services/metamask.service';
import AuctionNFT from '../../../../blockchain/artifacts/blockchain/contracts/AuctionNFT.sol/AuctionNFT.json';

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
  constructor(public metamaskService:MetamaskService) { }

  ngOnInit(): void {
    this.signer = this.metamaskService.getSigner();
    this.NFT = this.metamaskService.getNFTContract();
    console.log(this.NFT.address);
    console.log("Mami:",this.nftId);
    this.NFT['tokenURI(uint256)'](this.nftId).then((res:any)=>{
      // console.log({URI:res});
      this.pinataUrl = JSON.parse(res).image;
    }).catch((err:any)=>{
      console.log({error_uri:err})
    })
    

  }

}
