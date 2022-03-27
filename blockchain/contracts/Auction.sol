pragma solidity ^0.8.4;

contract Auction{
    address payable public beneficiary;
    
    uint public endTime; // in secunde
    string public item;
    address public highestBidder;
    uint public highestBid;
    uint public initialBid;
    bool public timesUp;

    mapping(address => uint) public pendingReturns;

    event BidIncreased(address bidder, uint amount);
    event AuctionEnded(address auctionWinner, uint amount);

    constructor(uint time,string memory name,uint initBid){
        beneficiary = payable (msg.sender);
        endTime = block.timestamp + time;
        item = name;
        initialBid = initBid;
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
    function fInitialHighestBid() public view returns(uint){
        return initialBid;
    }

    function fHighestBiddder() public view returns(address){
        return highestBidder;
    }
    function senderPendingReturns() public view returns(uint){
        return pendingReturns[msg.sender];
    }
    function getItemName() public view returns(string memory){
        return item;
    }
    function getItemEndTime() public view returns (uint){
        return endTime;
    }
    
}