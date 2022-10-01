import { FC } from 'react'
import Link from 'next/link'
import { Menu } from 'semantic-ui-react'

export const Navbar: FC = () => {
  return (
    <Menu>
      <Link href='/'>
        <Menu.Item>
          CrowdCoin
        </Menu.Item>
      </Link>
      <Menu.Menu position='right'>
        <Link href='/'>
          <Menu.Item>
            Campaigns
          </Menu.Item>
        </Link>
        <Link href='/campaigns/new_campaign'>
          <Menu.Item>
            +
          </Menu.Item>
        </Link>
      </Menu.Menu>
    </Menu>
  )
}
