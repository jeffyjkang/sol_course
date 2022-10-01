import { FC, FormEvent, useState } from "react";
import { useRouter } from 'next/router';
import { Form, Input, Message, Button } from "semantic-ui-react";
import { getCampaignInstance } from '../web3/campaign';
import web3 from "../web3/web3";

interface ContributionCampaignFormProps {
  campaignAddress: string;
}

export const ContributeCampaignForm: FC<ContributionCampaignFormProps> = ({campaignAddress}) => {
  const router = useRouter();
  const campaignInstance = getCampaignInstance(campaignAddress);
  const [contrAmt, setContrAmt] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: FormEvent) => {

    e.preventDefault();
    try {
      setLoading(true)
      setErrMsg('')
      const [account] = await web3.eth.getAccounts()
      await campaignInstance.methods.contribute().send({
        from: account,
        value: web3.utils.toWei(contrAmt, 'ether')
      })
      router.replace(`/campaigns/${campaignAddress}`);
    }
    catch (err: any) {
      setErrMsg(err.message)
    }
    finally {
      setContrAmt('')
      setLoading(false)
    }
  }

  return (
    <Form onSubmit={onSubmit} error={errMsg ? true : false}>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input
          label='ether'
          labelPosition='right'
          value={contrAmt}
          onChange={(e) => setContrAmt(e.target.value)}
        />
      </Form.Field>
      <Message error header='Oops!' content={errMsg} />
      <Button primary loading={loading}>Contribute</Button>
    </Form>
  )
}
