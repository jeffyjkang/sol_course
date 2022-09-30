import { NextPage } from "next";
import Head from "next/head";
import { CampaignDetails } from "../../components/campaignDetails";
import campaignFactoryInstance from "../../web3/factory";
import { getCampaignInstance } from '../../web3/campaign';
import web3 from "../../web3/web3";

type PathParams = {
  params: {
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

export const getStaticPaths = async () => {
  const campaigns = await campaignFactoryInstance.methods.getDeployedCampaigns().call();
  const paths = campaigns.map((address: string) => ({
    params: {
      address
    }
  }))
  return {paths, fallback: false}
}

export const getStaticProps = async ({params}: PathParams) => {
  const campaignInstance = getCampaignInstance(params.address)
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
      campaignAddress: params.address
    }
  }
}


// export const getServerSideProps = async ({query}) => {
//   console.log(query)
//   return {
//     props: {

//     }
//   }
// }

export default CampaignAddress
