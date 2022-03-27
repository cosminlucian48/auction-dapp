import { Injectable } from "@angular/core";
import { ethers } from "ethers";
@Injectable()
export class AppServices{
    constructor(){

    }
    window: any = undefined;
    provider = new ethers.providers.Web3Provider(this.window.ethereum);
}