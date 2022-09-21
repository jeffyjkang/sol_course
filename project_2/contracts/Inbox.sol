// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.16;

contract Inbox {
  string private message;

  constructor(string memory initialMessage) {
    message = initialMessage;
  }

  function setMessage(string calldata newMessage) public {
    message = newMessage;
  }

  function getMessage() public view returns (string memory) {
    return message;
  }
}
