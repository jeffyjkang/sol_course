import { FC, useEffect, useState } from "react"
import Link from "next/link";
import { Card } from 'semantic-ui-react'

type CampaignItem = {
  header: string;
  description: JSX.Element;
  fluid: boolean;
}

interface CampaignListProps {
  campaigns: string[]
}

export const CampaignList: FC<CampaignListProps> = ({campaigns}) => {

  const [campaignItems, setCampaignItems] = useState<CampaignItem[]>([])
  useEffect(() => {
    const mappedCampaigns = campaigns.map((address) => {
      return {
        header: address,
        description: <Link href={`/campaigns/${address}`}>View Campaign</Link>,
        fluid: true
      }
    })
    setCampaignItems(mappedCampaigns);
  }, [campaigns])

  return (
    <Card.Group items={campaignItems} />
  )
}
