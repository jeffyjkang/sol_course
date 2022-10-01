import { FC, FormEvent, useState } from "react";
import { Form, Button, Message, Input } from "semantic-ui-react";
import { getCampaignInstance } from "../web3/campaign";
import web3 from '../web3/web3';
import { useRouter } from "next/router";
import Link from "next/link";

interface NewRequestFormProps {
  campaignAddress: string;
}

export const NewRequestForm: FC<NewRequestFormProps> = ({campaignAddress}) => {
  const router = useRouter();
  const campaignInstance = getCampaignInstance(campaignAddress);
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [recipient, setRecipient] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [loading, setLoading] = useState(false);


  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true)
      setErrMsg('')
      const [account] = await web3.eth.getAccounts()
      await campaignInstance.methods.createRequest(
        description,
        web3.utils.toWei(value, 'ether'),
        recipient
      ).send({
        from: account
      })
      router.push(`/campaigns/${campaignAddress}/requests`)
    }
    catch (err: any) {
      setErrMsg(err.message)
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Link href={`/campaigns/${campaignAddress}/requests`}>
        Back
      </Link>
      <h3>Create a request</h3>
      <Form onSubmit={onSubmit} error={errMsg ? true : false}>
        <Form.Field>
          <label>Description</label>
          <Input
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Value in Ether</label>
          <Input
            value={value}
            onChange={(e)=>setValue(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Recipient</label>
          <Input
            value={recipient}
            onChange={(e)=>setRecipient(e.target.value)}
          />
        </Form.Field>
        <Message error header='Oops!' content={errMsg} />
        <Button primary loading={loading}>New Request</Button>
      </Form>
    </>
  )
}
