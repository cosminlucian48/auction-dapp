import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auction-page',
  templateUrl: './auction-page.component.html',
  styleUrls: ['./auction-page.component.css']
})
export class AuctionPageComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }
  back(){
    this.route.navigateByUrl("")
  }
}
