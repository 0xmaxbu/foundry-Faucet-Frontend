import { useState } from 'react';
import { Web3 } from 'web3';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import './App.css'

function App() {
  const [isConnected, setIc] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [web3, setWeb3] = useState(false);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [isFauceted, setIf] = useState(false);
  
  async function connectWallet(){
    setConnecting(true);
    let web3Provider;
    if (window.ethereum) {
      web3Provider = window.ethereum;
      try {
        // 请求用户授权
        await window.ethereum.enable();
      } catch (error) {
        // 用户不授权时
        console.error("User denied account access")
      }
    } else if (window.web3) { // 老版 MetaMask Legacy dapp browsers...
        web3Provider = window.web3.currentProvider;
    } else {
        web3Provider = new Web3.providers.HttpProvider('https://virtual.mainnet.rpc.tenderly.co/45413366-6994-4e16-aee3-52d53ad0f62f');
    }
    setWeb3(new Web3(web3Provider));
    setConnecting(false);
    setIc(true);
  }

  function switchNetwork(){
    if(web3 === null){
      return;
    }
    web3.
  }

  function getFaucet(){
    if(address === ''){
      return;
    }

    setLoading(true);
  }

  return (
    <>
      <h1>Foundry-Facuet</h1>
      <div className="card">
        {!isConnected ? (
        <Button variant="contained" onClick={() => connectWallet() } loading={connecting}>
          Connect Wallet
        </Button>
        ) : (
          <>
            <TextField id="standard-basic" label="Address" variant="standard" value={address}/>
            <Button variant="contained" onClick={getFaucet} loading={loading}>Get Faucet</Button>

          </>
        )}
      </div>
    </>
  )
}

export default App
