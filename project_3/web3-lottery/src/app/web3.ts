import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import LotteryContractBuild from '../Lottery.json';
const lottery_address = process.env.REACT_APP_LOTTERY_ADDRESS;

// declare global {
//   interface Window {
//     ethereum?: any
//     web3?: any
//   }
// }

// window.ethereum.enable();
// const web3 = new Web3(window.web3.currentProvider);

// given provider should be metamask
// 7545 is ganache

const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');

const lotteryContract = new web3.eth.Contract(LotteryContractBuild.abi as AbiItem[], lottery_address)

export { web3, lotteryContract };
