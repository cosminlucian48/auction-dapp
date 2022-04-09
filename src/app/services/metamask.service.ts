declare let window: any; // typescript shenanigans
import { Injectable } from "@angular/core";
import { ethers } from "ethers";

import addresses from '../../../environment/contract-address.json';
import Auction from '../../../blockchain/artifacts/blockchain/contracts/Auction.sol/Auction.json';
import AuctionNFT from '../../../blockchain/artifacts/blockchain/contracts/AuctionNFT.sol/AuctionNFT.json';
import AuctionFactory from '../../../blockchain/artifacts/blockchain/contracts/AuctionFactory.sol/AuctionFactory.json';

@Injectable()
export class MetamaskService {
  public signer: any;
  public auctionFactoryContract: any;
  public auctionContract: any;
  public aucc: any;
  public account: any;
  public nftContract: any;
  constructor() {

  }
  async checkIfMetamaskUserIsValid(): Promise<boolean> {
    if (window.ethereum) {
      console.log({ window, eth: window.ethereum })
      console.log("Exista user metamask");
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("Accountul din metamask:", accounts);
        this.account = accounts[0];
        return true;
      } catch (error) {
        console.log("Error...")
      }
    } else {
      console.log("Nu exista user metamask");
    }
    return false;
  }
  async createAuctionFactoryContractInstance() {
    const checkIfMetamaskUserIsValid = await this.checkIfMetamaskUserIsValid();
    if (checkIfMetamaskUserIsValid) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log("Provider:", provider);

      provider.on("network", (netNetwork: any, oldNetwork: any) => {
        if (oldNetwork) {
          window.location.reload();
        }
      });

      this.signer = provider.getSigner();
      console.log("Signer:", this.signer);

      if (await this.signer.getChainId() !== 31337) {
        alert("Wrong network");
      }
      this.auctionFactoryContract = new ethers.Contract(addresses.auctionFactoryContract, AuctionFactory.abi, this.signer);
      this.nftContract = new ethers.Contract(addresses.auctionNFTContract, AuctionNFT.abi, this.signer);
      return true;
    }
    return false;
  }

  getAuctionFactory() {
    if (this.auctionFactoryContract != null) {
      return this.auctionFactoryContract;
    }
    // else{
    //   // this.createAuctionFactoryContractInstance();
    //   // this.getAuctionFactory();
    // }
    return null;
  }

  getNFTContract() {
    if (this.nftContract != null) {
      return this.nftContract;
    }
    // else{
    //   // this.createAuctionFactoryContractInstance();
    //   // this.getAuctionFactory();
    // }
    return null;
  }
  getAccount() {
    return this.account;
  }

  getSigner() {
    if (this.signer) {
      return this.signer;
    }
    return null;
  }

  // provider = new ethers.providers.Web3Provider(this.window.ethereum);
}
