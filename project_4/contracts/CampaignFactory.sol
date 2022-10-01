// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.16;
import "./Campaign.sol";

contract CampaignFactory {
  address[] public deployedCampaigns;

  function createCampaign (uint min) public {
    Campaign newCampaign = new Campaign(min, msg.sender);
    deployedCampaigns.push(address(newCampaign));
  }

  function getDeployedCampaigns() public view returns (address[] memory) {
    return deployedCampaigns;
  }
}
