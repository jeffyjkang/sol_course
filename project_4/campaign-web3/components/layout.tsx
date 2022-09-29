import { PropsWithChildren } from "react"
import { Container } from 'semantic-ui-react'
import { Navbar } from "./navbar";

export const Layout = ({children}: PropsWithChildren) => {
  return (
    <Container style={{margin: '2rem 0'}}>
      <Navbar />
      {children}
    </Container>
  )
}
