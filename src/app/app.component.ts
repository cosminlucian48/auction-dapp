declare let window: any;
import { Component } from '@angular/core';
import {ethers} from 'ethers';
import { FormControl , FormGroup} from '@angular/forms';

import addresses from '../../environment/contract-address.json';
import Bank from '../../blockchain/artifacts/blockchain/contracts/Bank.sol/Bank.json';
import Token from '../../blockchain/artifacts/blockchain/contracts/Token.sol/Token.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public depositForm: FormGroup;
  public withdrawForm: FormGroup;

  public signer: any;

  public bankContract: any;
  public tokenContract: any;
}
