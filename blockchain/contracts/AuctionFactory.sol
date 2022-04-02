pragma solidity 0.7.1;
import "./Auction.sol";
import "./AuctionNFT.sol";


contract AuctionFactory{
    
    Auction[] public auctions;
    AuctionNFT[] public auctionNFTs;
    address[] public auctionsAddresses;
    address[] public auctionsNFTAddresses;

    function getContractCount() public view returns(uint){
        return auctions.length;
    }
    
    function newAuction(string memory name, uint initialBid, uint time) public returns(Auction newContract){
        Auction auc = new Auction(time, name,initialBid);
        auctions.push(auc);
        auctionsAddresses.push(address(auc));
        
        return auc;
    }

    function newAuctionNFT(address recipient, string memory tokenURI)public returns(AuctionNFT){
        AuctionNFT auctionNFT = new AuctionNFT();
        auctionNFT.mintNFT(recipient, tokenURI);

        auctionNFTs.push(auctionNFT);
        auctionsNFTAddresses.push(address(auctionNFT));

        return auctionNFT;
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