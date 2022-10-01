import { NextPage } from "next";
import Head from "next/head";
import { CampaignRequests } from "../../../components/campaignRequests";
import { Ctx } from "../[address]";
import { getCampaignInstance } from '../../../web3/campaign'
import web3 from "../../../web3/web3";

export type Request = {
  id: number,
  description: string,
  value: string,
  recipient: string,
  approvalCount: number,
  complete: boolean
}

interface RequestProps {
  campaignAddress: string
  requests: Request[]
  requestCount: number
  approversCount: number
}

const Requests: NextPage<RequestProps> = ({campaignAddress, requests, requestCount, approversCount}) => {

  return (
    <>
      <Head>
        <title>Campaign Requests</title>
      </Head>
      <CampaignRequests
        campaignAddress={campaignAddress}
        requests={requests}
        requestCount={requestCount}
        approversCount={approversCount}
      />
    </>
  )
}

export const getServerSideProps = async ({query}: Ctx) => {
  const campaignInstance = getCampaignInstance(query.address);
  const approversCount = await campaignInstance.methods.approversCount().call()
  const requestCount = await campaignInstance.methods.getRequestCount().call()
  let requests = await Promise.all(
    Array(Number(requestCount)).fill(null).map((_, i) => {
      return campaignInstance.methods.requests(i).call()
    })
  )
  requests = requests.map((element, index) => {
    return {
      id: index,
      description: element.description,
      value: web3.utils.fromWei(element.value, 'ether'),
      recipient: element.recipient,
      approvalCount: Number(element.approvalCount),
      complete: element.complete
    }
  })
  return {
    props: {
      campaignAddress: query.address,
      requests,
      requestCount,
      approversCount
    }
  }
}


export default Requests;