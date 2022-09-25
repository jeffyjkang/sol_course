import React, { useState, useEffect } from 'react';
import { web3, lotteryContract } from './web3';
import './App.css';

function App() {
  const [manager, setManager] = useState('');
  const [players, setPlayers] = useState<string[]>([]);
  const [balance, setBalance] = useState('');
  const [ethEnterVal, setEthEnterVal] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    (async () => {

      // request if metamask is not connected to our app
      // const accounts = await web3.eth.requestAccounts();
      // account that is connected to metamask/our app
      // const accounts = await web3.eth.getAccounts();
      // console.log(accounts);

      // const networkId = await web3.eth.net.getId();
      const manager = await lotteryContract.methods.getManager().call();
      setManager(manager);
      const players = await lotteryContract.methods.getPlayers().call();
      setPlayers(players);
      const balance = await web3.eth.getBalance(lotteryContract.options.address);
      setBalance(balance);
    })();
  }, []);

  const enterLottoHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();
    setMessage('Waiting on transaction...')
    await lotteryContract.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(ethEnterVal, 'ether')
    })
    setMessage('You have been entered')
  }

  const pickWinnerHandler = async (e: React.MouseEvent) => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();
    setMessage('Waiting on transaction...')
    await lotteryContract.methods.pickWinner().send({
      from: accounts[0]
    })
    setMessage('A winner has been picked')
  }

  return (
    <div className="App">
      <h2>Lottery Contract</h2>
      <p>
        This contract is managed by: {manager} <br/>
        There are currently {players.length} people entered, <br/>
        competing to win {web3.utils.fromWei(balance, 'ether')} ether
      </p>
      <hr />
      <form onSubmit={enterLottoHandler}>
        <h4>Want to try your luck?</h4>
        <div>
          <label>Amount of ether to enter: </label>
          <input
            onChange={e => setEthEnterVal(e.target.value)}
          />
        </div>
        <button>Enter</button>
      </form>
      <hr />
      <h4>Ready to pick a winner?</h4>
      <button onClick={pickWinnerHandler}>Pick winner</button>
      <hr />
      <h1>{message}</h1>

    </div>
  );
}

export default App;
