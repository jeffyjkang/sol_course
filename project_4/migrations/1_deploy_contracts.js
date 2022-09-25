// const Campaign = artifacts.require('Campaign');
const CampaignFactory = artifacts.require('CampaignFactory');

module.exports = (deployer) => {
  deployer.deploy(CampaignFactory);
}
