import web3 from './web3';
import { AbiItem } from 'web3-utils';

import CampaignBuild from '../../build/contracts/Campaign.json';

const getCampaignInstance = (campaignAddress: string) => {
  const campaignInstance = new web3.eth.Contract(CampaignBuild.abi as unknown as AbiItem, campaignAddress)
  return campaignInstance
}

export { getCampaignInstance }
