import Link from 'next/link'
import { FC } from 'react'
import { Button } from 'semantic-ui-react'

export const AddCampaign: FC = () => {
  return (
    <Link href='/campaigns/new_campaign'>
      <Button
        content='Create Campaign'
        icon='add circle'
        primary
        floated='right'
        />
    </Link>
  )
}
