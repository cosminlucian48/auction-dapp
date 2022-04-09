pragma solidity 0.7.1;
import "./Auction.sol";

contract AuctionFactory {
    address[] public auctionsAddresses;

    function newAuction(
        uint256 nftId,
        string memory name,
        uint256 initialBid,
        uint256 time
    ) public returns (Auction newContract) {
        Auction auc = new Auction(nftId, msg.sender, time, name, initialBid);
        auctionsAddresses.push(address(auc));
        return auc;
    }

    function getAllAuctionsAddresses()
        public
        view
        returns (address[] memory listOfAuctions)
    {
        return auctionsAddresses;
    }

}
