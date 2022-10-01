import { FC, useEffect, useState } from 'react'
import { CampaignAddressProps } from '../pages/campaigns/[address]'
import { Card, Grid, Button } from 'semantic-ui-react'
import { ContributeCampaignForm } from './contributeCampaignForm';
import Link from 'next/link';

type CampaignDetailItem = {
  header: string;
  meta: string;
  style: {
    [k: string]: string
  }
}

export const CampaignDetails: FC<CampaignAddressProps> = (props) => {

  const [campaignDetails, setCampaignDetails] = useState<CampaignDetailItem[]>([]);

  useEffect(() => {
    const items = Object.entries(props).filter(
      (entry) => entry[0] !== 'campaignAddress'
    )
    .map(
      (entry) => {
        return {
          header: entry[0],
          meta: entry[1],
          style: { overflowWrap: 'break-word' }
        }
      }
    )
    setCampaignDetails(items)
  }, [props])
  return (
    <>
      <h3>Campaign Details</h3>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            <Card.Group items={campaignDetails} />
          </Grid.Column>
          <Grid.Column width={6}>
            <ContributeCampaignForm campaignAddress={props.campaignAddress}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Link href={`/campaigns/${props.campaignAddress}/requests`}>
              <Button primary>View Requests</Button>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}
