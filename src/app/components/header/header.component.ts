import { Component, OnInit } from '@angular/core';
import { getDefaultProvider  } from 'ethers';

import { providers } from 'ethers';

import { InjectionToken } from '@angular/core';
import { MetamaskService } from 'src/app/services/metamask.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username: string = '';
  public user = providers.getDefaultProvider();
  constructor(public metamaskService:MetamaskService) { }

  ngOnInit():void {
    console.log(this.metamaskService.getSigner());
    // this.username = this.metamaskService.getSigner();
  }

}
