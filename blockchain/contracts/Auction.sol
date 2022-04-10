pragma solidity 0.7.1;

contract Auction {
    address payable public beneficiary;

    uint256 public endTime; // in secunde
    string public item;
    address public highestBidder;
    uint256 public highestBid;
    uint256 public initialBid;
    bool public timesUp;
    uint256 public nftId;
    mapping(address => uint256) public pendingReturns;

    event BidIncreased(address bidder, uint256 amount);
    event AuctionEnded(address auctionWinner, uint256 amount);

    constructor(
        uint256 id,
        address benef,
        uint256 time,
        string memory name,
        uint256 initBid
    ) {
        nftId = id;
        beneficiary = payable(benef);
        endTime = block.timestamp + time;
        item = name;
        initialBid = initBid;
    }

    function bid() public payable {
        require(block.timestamp <= endTime, "Actiunea s-a terminat");
        require(msg.value > highestBid, "Bid-ul este prea mic");
        require(
            msg.sender != beneficiary,
            "You can't bid on your own auction."
        );
        require(msg.value > initialBid, "Bid prea mic");

        if (highestBid != 0) {
            pendingReturns[highestBidder] += highestBid;
        }

        highestBidder = msg.sender;
        highestBid = msg.value;

        emit BidIncreased(highestBidder, highestBid);
    }

    function withdraw() public returns (bool) {
        require(msg.sender != highestBidder, "You are the highest Bidder.");
        require(pendingReturns[msg.sender]>0, "Your pending returns are 0.");
        uint256 amount = pendingReturns[msg.sender];
        if (amount > 0) {
            pendingReturns[msg.sender] = 0;
            if (!payable(msg.sender).send(amount)) {
                pendingReturns[msg.sender] = amount;
                return false;
            }
        }
        return true;
    }

    function auctionEnd() external {
        require(block.timestamp >= endTime, "Actiunea nu s-a terminat");
        require(!timesUp, "Functia de end a fost deja apelata");
        require(highestBid > 0, "Nu exista highest bid.");
        require(
            msg.sender == beneficiary,
            "Only the seller can end the auction."
        );

        timesUp = true;

        beneficiary.transfer(highestBid);
    }

    function getTotalBalanceOfContract() public view returns (uint256) {
        return address(this).balance;
    }

    function auctionEnded() public view returns (bool) {
        return timesUp;
    }

    function fHighestBid() public view returns (uint256) {
        return highestBid;
    }

    function getInitialBid() public view returns (uint256) {
        return initialBid;
    }

    function fHighestBiddder() public view returns (address) {
        return highestBidder;
    }

    function senderPendingReturns() public view returns (uint256) {
        return pendingReturns[msg.sender];
    }

    function getItemName() public view returns (string memory) {
        return item;
    }

    function getItemEndTime() public view returns (uint256) {
        return endTime;
    }

    function getNFTId() public view returns (uint256) {
        return nftId;
    }

    function getBeneficiary() public view returns (address) {
        return beneficiary;
    }
}
