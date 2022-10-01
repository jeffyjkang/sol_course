import { NextPage } from "next"
import Head from "next/head";
import { NewRequestForm } from "../../../../components/newRequestForm";
import { Ctx } from "../../[address]";

interface NewRequestProps {
  campaignAddress: string
}

const NewRequest: NextPage<NewRequestProps> = ({campaignAddress}) => {
  return (
    <>
      <Head>
        <title>Create Request</title>
      </Head>
      <NewRequestForm campaignAddress={campaignAddress}/>
    </>
  )
}

export const getServerSideProps = async ({query}: Ctx) => {
  return {
    props: {
      campaignAddress: query.address
    }
  }
}

export default NewRequest;
