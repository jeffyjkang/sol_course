import { NextPage } from "next"
import Head from "next/head"
import { AddCampaignForm } from "../../components/addCampaignForm"

const NewCampaign: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create new campaign</title>
      </Head>
      <AddCampaignForm />
    </>
  )
}

export default NewCampaign
