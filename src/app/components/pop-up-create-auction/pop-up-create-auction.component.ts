import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-pop-up-create-auction',
  templateUrl: './pop-up-create-auction.component.html',
  styleUrls: ['./pop-up-create-auction.component.css']
})
export class PopUpCreateAuctionComponent implements OnInit {
  profileForm = new FormGroup({
    nameItem: new FormControl(''),
    deploymentTime: new FormControl(''),
    initialBid: new FormControl('')
  });

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }
  constructor() { }

  ngOnInit(): void {

  }

}
