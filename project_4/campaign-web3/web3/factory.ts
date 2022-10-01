import web3 from './web3';
import  { AbiItem } from 'web3-utils';

import CampaignFactoryBuild from '../../build/contracts/CampaignFactory.json';
const campaignFactoryAddress = process.env.campaignFactoryAddress;

const campaignFactoryInstance = new web3.eth.Contract(CampaignFactoryBuild.abi as AbiItem[], campaignFactoryAddress);

export default campaignFactoryInstance;
