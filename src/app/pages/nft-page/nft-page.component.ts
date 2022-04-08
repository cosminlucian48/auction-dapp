import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MetamaskService } from 'src/app/services/metamask.service';
@Component({
  selector: 'app-nft-page',
  templateUrl: './nft-page.component.html',
  styleUrls: ['./nft-page.component.css']
})
export class NftPageComponent implements OnInit {

  nftIds:Array<any> = new Array<any>();
  owner:any;
  auctionFactoryContract:any;
  nftContract:any;
  constructor(private route: Router, public metamaskService:MetamaskService) { }

  ngOnInit(): void {
    this.owner = this.metamaskService.getAccount();
    this.auctionFactoryContract = this.metamaskService.getAuctionFactory();
    this.nftContract = this.metamaskService.getNFTContract();
    if(this.nftContract==null){
      console.log("Nu exista instanta!")
      this.metamaskService.createAuctionFactoryContractInstance().then( (res:boolean) =>{
        if(res){
          this.getAddresses();
        }
      }).catch((err:any)=>{
          alert("Cant create instance.")
      });
    }else{
      this.getAddresses();
    }
  }

  getAddresses(){
    this.nftContract = this.metamaskService.getNFTContract();
    this.owner = this.metamaskService.getAccount();
    console.log(this.nftContract);
    console.log({owner:this.owner})
    this.nftContract.getNFTIdsForUser({from:this.owner}).then((res:any)=>{
      console.log({nfts:res});
      this.nftIds = res;
    }).catch((err:any) =>{
      console.log(err);
    });
  }
  back(){
    this.route.navigateByUrl("");
  }
}
