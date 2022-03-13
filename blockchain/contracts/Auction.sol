pragma solidity ^0.8.4;

contract Auction{
    address payable public beneficiary;
    uint public endTime; // in secunde
    address public highestBidder;
    uint public highestBid;
    bool public timesUp;

    mapping(address => uint) public pendingReturns;

    event BidIncreased(address bidder, uint amount);
    event AuctionEnded(address auctionWinner, uint amount);

    constructor(uint time){
        beneficiary = payable (msg.sender);
        endTime = block.timestamp + time;
    }

    function bid() public payable{
        require(block.timestamp <= endTime, "Actiunea s-a terminat");
        require(msg.value > highestBid, "Bid-ul este prea mic");

        if(highestBid != 0){
            pendingReturns[highestBidder] += highestBid;
        }
        highestBidder = msg.sender;
        highestBid = msg.value;

        emit BidIncreased(highestBidder, highestBid);
    }
    
    function withdraw() public returns(bool){
        // require(msg.sender != highestBidder, "nu poti iesi de aicia ca ai cea mai mare suma");

        uint amount = pendingReturns[msg.sender];
        if(amount > 0){
            pendingReturns[msg.sender] = 0;
            if(!payable (msg.sender).send(amount)){
                pendingReturns[msg.sender] = amount;
                return false;
            }
        }
        
        return true;
    }

    function auctionEnd() public{
        require(block.timestamp > endTime, "Actiunea nu s-a terminat");
        require(!timesUp, "Functia de end a fost deja apelata");

        timesUp = true;

        beneficiary.transfer(highestBid);
        emit AuctionEnded(highestBidder, highestBid);
    }

    function auctionEnded() public view returns(bool){
        return timesUp;
    }

    function fHighestBid() public view returns(uint){
        return highestBid;
    }

    function senderPendingReturns() public view returns(uint){
        return pendingReturns[msg.sender];
    }
}