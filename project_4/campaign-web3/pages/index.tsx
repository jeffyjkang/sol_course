import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { web3, campaignFactoryContract, campaignAbi } from '../web3/web3';

const Home: NextPage = () => {
  // console.log(web3)
  // console.log(campaignFactoryContract)
  // console.log(campaignAbi)
  return (
    <div className={styles.container}>
      <Head>
        <title>Campaign Web3 App</title>
      </Head>

      <main className={styles.main}>
        <h1>Campaign Web3 App</h1>
      </main>
    </div>
  )
}

export default Home
