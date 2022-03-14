import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { PopUpCreateAuctionComponent } from 'src/app/components/pop-up-create-auction/pop-up-create-auction.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  constructor(private route: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  nextPage()
  {
    this.route.navigateByUrl("/auction")
  }

  openDialog(){
    const dialogRef = this.dialog.open(PopUpCreateAuctionComponent);

  }
}
