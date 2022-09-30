// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.16;

contract Campaign {
  struct Request {
    string description;
    uint value;
    address payable recipient;
    uint approvalCount;
    bool complete;
  }
  address public manager;
  uint public minimumContribution;
  mapping(address => bool) public approvers;
  uint public approversCount;
  Request[] public requests;
  // request id (in requests array) => address of approver -> boolean true false if approver in approvals
  mapping(uint => mapping(address => bool)) public approvals;

  modifier restricted() {
    require(msg.sender == manager);
    _;
  }

  constructor (
    uint min,
    address creator
  ) {
    manager = creator;
    minimumContribution = min;
  }

  function contribute() public payable {
    string memory errorMsg = "Value must be greater than min contribution";
    require(msg.value > minimumContribution, errorMsg);
    approvers[msg.sender] = true;
    approversCount++;
  }

  function createRequest(string calldata description, uint value, address payable recipient)
    public restricted {
      Request memory newRequest = Request({
        description : description,
        value : value,
        recipient : recipient,
        approvalCount: 0,
        complete: false
      });
      requests.push(newRequest);
  }

  function approveRequest(uint index) public {
    require(approvers[msg.sender], "Must be an approver to approve request");
    require(!approvals[index][msg.sender], "Cannot approve twice");
    requests[index].approvalCount++;
    approvals[index][msg.sender] = true;
  }

  function finalizeRequest(uint index) public restricted {
    Request storage request = requests[index];
    require(!request.complete, "Request has already been completed");
    require(request.approvalCount >= approversCount / 2, "Must require majority vote to finalize request");
    request.recipient.transfer(request.value);
    request.complete = true;
  }

  function getSummary() public view returns (
    uint,
    uint,
    uint,
    uint,
    address
  ) {
    return (
      minimumContribution,
      address(this).balance,
      requests.length,
      approversCount,
      manager
    );
  }

  function getRequestCount() public view returns (uint) {
    return requests.length;
  }

}
