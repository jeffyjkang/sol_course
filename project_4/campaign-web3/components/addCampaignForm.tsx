import { FC, FormEvent, useState } from 'react'
import { Form, Button, Input, Message } from 'semantic-ui-react'
import campaignFactoryInstance from '../web3/factory'
import web3 from '../web3/web3'
import { useRouter } from 'next/router'

export const AddCampaignForm: FC = () => {
  const router = useRouter()
  const [minContr, setMinContr] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true)
      setErrMsg('')
      const [account] = await web3.eth.getAccounts()
      await campaignFactoryInstance.methods.createCampaign(minContr).send({
        from: account
      })
      router.push('/')
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
      <h3>Create a Campaign</h3>
      <Form onSubmit={onSubmit} error={errMsg ? true : false}>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            label='wei'
            labelPosition='right'
            value={minContr}
            onChange={(e) => setMinContr(e.target.value)}
          />
        </Form.Field>
        <Message error header="Oops!" content={errMsg} />
        <Button primary loading={loading}>Create</Button>
      </Form>
    </>
  )
}
