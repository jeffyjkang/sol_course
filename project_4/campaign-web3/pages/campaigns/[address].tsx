import { NextPage } from "next";
import Head from "next/head";
import { CampaignDetails } from "../../components/campaignDetails";
import { getCampaignInstance } from '../../web3/campaign';
import web3 from "../../web3/web3";

export type Ctx = {
  query: {
    address: string;
  }
}

export interface CampaignAddressProps {
  minContribution: string,
  balance: string,
  requestsLength: string,
  approversCnt: string,
  manager: string;
  campaignAddress: string;
}

const CampaignAddress: NextPage<CampaignAddressProps> = (props) => {
  return (
    <>
      <Head>
        <title>Campaign Details</title>
      </Head>
      <CampaignDetails {...props} />
    </>
  )
}

export const getServerSideProps = async ({query}: Ctx) => {
  const campaignInstance = getCampaignInstance(query.address)
  const {
    '0': minContribution,
    '1': balance,
    '2': requestsLength,
    '3': approversCnt,
    '4': manager
  } = await campaignInstance.methods.getSummary().call()
  return {
    props: {
      manager,
      minContribution,
      balance: web3.utils.fromWei(balance, 'ether'),
      requestsLength,
      approversCnt,
      campaignAddress: query.address
    }
  }
}

export default CampaignAddress
