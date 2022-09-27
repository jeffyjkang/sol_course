import Web3 from 'web3';
import  { AbiItem } from 'web3-utils';
import CampaignFactoryBuild from '../../build/contracts/CampaignFactory.json';
import CampaignBuild from '../../build/contracts/Campaign.json';
const campaignFactoryAddress = process.env.campaignFactoryAddress;

const web3 = new Web3(Web3.givenProvider);
const campaignFactoryContract = new web3.eth.Contract(CampaignFactoryBuild.abi as AbiItem[], campaignFactoryAddress);
const campaignAbi = CampaignBuild.abi;
export { web3, campaignFactoryContract, campaignAbi};
