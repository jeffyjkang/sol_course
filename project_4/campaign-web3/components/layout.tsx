import { FC, PropsWithChildren } from "react"
import { Container } from 'semantic-ui-react'
import { Navbar } from "./navbar";
import 'semantic-ui-css/semantic.min.css'

export const Layout: FC<PropsWithChildren> = ({children}) => {
  return (
    <Container style={{margin: '2rem 0'}}>
      <Navbar />
      {children}
    </Container>
  )
}
