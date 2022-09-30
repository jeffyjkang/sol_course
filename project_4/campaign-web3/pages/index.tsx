import type { NextPage } from 'next'
import Head from 'next/head'
import campaignFactoryInstance from '../web3/factory'
import { CampaignList } from '../components/campaignList';
import { AddCampaign } from '../components/addCampaign';

interface HomeProps {
  campaigns: string[];
}

const Home: NextPage<HomeProps> = ({campaigns}) => {

  return (
    <>
      <Head>
        <title>Campaign Web3 App</title>
      </Head>
      <h3>Open Campaigns</h3>
      <AddCampaign />
      <CampaignList campaigns={campaigns} />
    </>
  )
}

// Home.getInitialProps = async () => {
//   const campaigns = await campaignFactoryInstance.methods.getDeployedCampaigns().call();
//   return { campaigns }
// }

export const getServerSideProps = async () => {
  const campaigns = await campaignFactoryInstance.methods.getDeployedCampaigns().call();
  return {
    props: {
      campaigns
    }
  }
}

export default Home
