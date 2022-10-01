import Web3 from 'web3';
const projectId = process.env.projectId;
declare global {
  interface Window {
    ethereum?: any;
  }
}

let web3: Web3;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  // console.log('running in browser')
  window.ethereum.request({method: 'eth_requestAccounts'});
  web3 = new Web3(Web3.givenProvider);
}
else {
  // console.log('running in browser or not metamask')
  const provider = new Web3.providers.HttpProvider(`https://ropsten.infura.io/v3/${projectId}`)
  web3 = new Web3(provider);
}
// console.log(web3)

export default web3;
