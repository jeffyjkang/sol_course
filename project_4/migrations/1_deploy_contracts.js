// const Campaign = artifacts.require('Campaign');
const CampaignFactory = artifacts.require('CampaignFactory');
const Campaign = artifacts.require('Campaign');

module.exports = (deployer) => {
  deployer.deploy(CampaignFactory);
  // second argument is supposed to be creator/manager
  // deployer.deploy(Campaign, 1, '0xEfcA720FbDfFb296023BE24f9ad0268da102CE1d')
}
