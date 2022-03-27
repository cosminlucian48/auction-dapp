pragma solidity ^0.8.4;
import "./Auction.sol";


contract AuctionFactory{
    
    Auction[] public auctions;
    address[] public auctionsAddresses;

    function getContractCount() public view returns(uint){
        return auctions.length;
    }
    
    function newAuction(string memory name, uint initialBid, uint time) public returns(Auction newContract){
        Auction auc = new Auction(time, name,initialBid);
        auctions.push(auc);
        auctionsAddresses.push(address(auc));
        
        return auc;
    }

    function checkAuction(uint number) public view returns(address auc){
        return auctionsAddresses[number];
    }

    function getAuciton(uint number) public view returns(Auction auc){
        return auctions[number];
    }
    function getAllAuctionsAddresses() public view returns (address[] memory listOfAuctions){
        return auctionsAddresses;
    }
    

}