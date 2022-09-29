import { useEffect, useState } from "react"
import { Card } from 'semantic-ui-react'

type CampaignItem = {
  header: string;
  description: JSX.Element;
  fluid: boolean;
}

interface CampaignListProps {
  campaigns: string[]
}

export const CampaignList = ({campaigns}: CampaignListProps) => {

  const [campaignItems, setCampaignItems] = useState<CampaignItem[]>([])
  useEffect(() => {
    const mappedCampaigns = campaigns.map((campaign) => {
      return {
        header: campaign,
        description: <a>View Campaign</a>,
        fluid: true
      }
    })
    setCampaignItems(mappedCampaigns);
  }, [campaigns])

  return (
    <Card.Group items={campaignItems} />
  )
}
