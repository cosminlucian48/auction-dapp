pragma solidity 0.7.1;

contract Auction{
    address payable public beneficiary;
    
    uint public endTime; // in secunde
    string public item;
    address public highestBidder;
    uint public highestBid;
    uint public initialBid;
    bool public timesUp;
    uint public nftId;
    mapping(address => uint) public pendingReturns;

    event BidIncreased(address bidder, uint amount);
    event AuctionEnded(address auctionWinner, uint amount);

    constructor(uint id,address benef,uint time,string memory name,uint initBid){
        nftId = id;
        beneficiary = payable(benef);
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

    function auctionEnd() external {
        require(block.timestamp >= endTime, "Actiunea nu s-a terminat");
        require(!timesUp, "Functia de end a fost deja apelata");
        require(highestBid>0,"Nu exista highest bid.");
        // require(address(this).balance > highestBid, "Nu ai destul eth.");
        timesUp = true;
        // emit AuctionEnded(highestBidder, highestBid);
        // beneficiary.send(3 ether);

        // beneficiary.call.value(3 ether).gas(20317)();

        beneficiary.transfer(highestBid);
        // (bool sent, bytes memory data) = beneficiary.call{value: highestBid-1}(abi.encode(highestBid-1));
        // require(sent, "Failed to send Ether");
        
    }

    function getTotalBalanceOfContract() public view returns(uint){
        return address(this).balance;
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
    function getNFTId() public view returns (uint){
        return nftId;
    }

    function getBeneficiary() public view returns(address){
        return beneficiary;
    }
}