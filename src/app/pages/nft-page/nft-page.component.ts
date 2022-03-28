import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nft-page',
  templateUrl: './nft-page.component.html',
  styleUrls: ['./nft-page.component.css']
})
export class NftPageComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }
  back(){
    this.route.navigateByUrl("");
  }
}
