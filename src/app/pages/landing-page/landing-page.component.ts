import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { PopUpCreateAuctionComponent } from 'src/app/components/pop-up-create-auction/pop-up-create-auction.component';

import { MetamaskService } from 'src/app/services/metamask.service';
import { PopUpCreateNftComponent } from 'src/app/components/pop-up-create-nft/pop-up-create-nft.component';
import { NotifierService } from 'angular-notifier';
// import '@typechain/hardhat';
// import '@nomiclabs/hardhat-ethers';
// import '@nomiclabs/hardhat-waffle';
// import { ethers, waffle } from 'hardhat'


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  checkIfFactoryIsReady:boolean = false;
  constructor(private route: Router, public dialog: MatDialog,public metamaskService:MetamaskService, public notifier:NotifierService) { }

  async ngOnInit() {
    this.checkIfFactoryIsReady = await this.metamaskService.createAuctionFactoryContractInstance();
  }

  nextPage()
  {
    this.route.navigateByUrl("/auction")
  }

  anotherPage()
  {
    this.route.navigateByUrl("/nft")
  }

  openDialog(){
    const dialogRef = this.dialog.open(PopUpCreateNftComponent);
  }
}
