import { FC, MouseEvent, useState } from "react"
import { Button, Table } from "semantic-ui-react"
import Link from 'next/link'
import { Request } from "../pages/campaigns/[address]/requests"
import { getCampaignInstance } from "../web3/campaign"
import web3 from "../web3/web3"
import { useRouter } from "next/router"

interface CampaignRequestsProps {
  campaignAddress: string
  requests: Request[]
  requestCount: number
  approversCount: number
}

export const CampaignRequests: FC<CampaignRequestsProps> = ({campaignAddress, requests, requestCount, approversCount}) => {
  const router = useRouter();
  const campaignInstance = getCampaignInstance(campaignAddress)
  const { Header, Row, HeaderCell, Body, Cell } = Table;
  const [approveLoading, setApproveLoading] = useState<null | string>(null)
  const [finalizeLoading, setFinalizeLoading] = useState<null | string>(null)

  const onApprove = async (e: MouseEvent<HTMLElement>, requestId: number) => {
    e.preventDefault();
    // possible check if approveLoading, and restrict call
    try {
      setApproveLoading('Loading...')
      const [account] = await web3.eth.getAccounts()
      await campaignInstance.methods.approveRequest(requestId).send({
        from: account
      })
      router.push(`/campaigns/${campaignAddress}/requests`)
    }
    catch (err) {
      console.log(err)
    }
    finally {
      setApproveLoading(null)
    }
  }

  const onFinalize = async (e: MouseEvent<HTMLElement>, requestId: number) => {
    e.preventDefault();
    // possible check if finalizeLoading, and restrict call
    try {
      setFinalizeLoading('Loading ...')
      const [account] = await web3.eth.getAccounts()
      await campaignInstance.methods.finalizeRequest(requestId).send({
        from: account
      })
      router.push(`/campaigns/${campaignAddress}/requests`)
    }
    catch (err) {
      console.log(err)
    }
    finally {
      setFinalizeLoading(null)
    }
  }

  return (
    <>
      <h3>Requests List</h3>
      <Table celled>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval Count</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
        <Body>
          {
            requests.map((request, i) => (
              <Row
                key={i}
                disabled={request.complete}
                positive={
                  request.approvalCount > approversCount / 2
                  && !request.complete
                }
              >
                <Cell>{request.id}</Cell>
                <Cell>{request.description}</Cell>
                <Cell>{request.value}</Cell>
                <Cell>{request.recipient}</Cell>
                <Cell>{request.approvalCount} / {approversCount}</Cell>
                <Cell>
                  {
                    !request.complete && (
                      <Button
                        color='green'
                        basic
                        onClick={(e) => onApprove(e, request.id)}
                      >
                        {approveLoading ?? 'Approve'}
                      </Button>
                    )
                  }
                </Cell>
                <Cell>
                  {
                    !request.complete && (
                      <Button
                        color='teal'
                        basic
                        onClick={(e) => onFinalize(e, request.id)}
                      >
                        {finalizeLoading ?? 'Finalize'}
                      </Button>
                    )
                  }
                </Cell>
              </Row>
            ))
          }
        </Body>
      </Table>
      <div>Found {requestCount} requests</div>
      <Link href={`/campaigns/${campaignAddress}/requests/new_request`}>
        <Button primary floated='right'>Add Request</Button>
      </Link>
    </>
  )
}
