import { useState } from 'react';
import { ethers, BrowserProvider, JsonRpcProvider, Contract } from 'ethers';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DiscoverWalletProviders } from './components/DiscoverWalletProviders'

function App() {
  const [isConnected, setIc] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [provider, setProvider] = useState<BrowserProvider | JsonRpcProvider | null>(null);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [isFauceted, setIf] = useState(false);

  console.log("ethers.js Version:",ethers.version);

  const TEST_NET_CONFIG = {
    chainId: '0x15511',
    chainName: 'maxbu-mainnet',
    rpcUrl: "https://virtual.mainnet.rpc.tenderly.co/45413366-6994-4e16-aee3-52d53ad0f62f",
    blockExplorerUrl: "https://mumbai.polygonscan.com/",
  };
  
  async function connectWallet(){
    setConnecting(true);
    let currentProvider: BrowserProvider | JsonRpcProvider;
    if(window.ethereum){
      currentProvider = new BrowserProvider(window.ethereum);
    } else {;
      currentProvider = new JsonRpcProvider(TEST_NET_CONFIG.rpcUrl);
    }
    setProvider(currentProvider);

    console.log("\n2. 查询provider连接到了哪条链")
    const network = await currentProvider.getNetwork();
    console.log(network.toJSON());

    try {
      const accounts = await currentProvider.send("eth_requestAccounts", []);
      const userAddress = accounts[0]; // 获取第一个账户地址
      console.log("Connected wallet address:", userAddress);
      setAddress(userAddress);
    } catch (error) {
      console.error("User denied account access:", error);
    }

    addNetwork();
    switchNetwork();

    setConnecting(false);
    setIc(true);
  }

  async function addNetwork(){
    if (window.ethereum) {
      const networkParams = {
          chainId: TEST_NET_CONFIG.chainId,
          chainName: TEST_NET_CONFIG.chainName,
          rpcUrls: [TEST_NET_CONFIG.rpcUrl],
          blockExplorerUrls: [TEST_NET_CONFIG.blockExplorerUrl],
      };
      try {
          await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [networkParams],
          });
          console.log("Network added successfully");
      } catch (error) {
          console.error("add network failed:", error);
      }
    }
  }

  function switchNetwork(){
    if (window.ethereum) {
      window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: TEST_NET_CONFIG.chainId }],
      })
      .then(() => console.log("switched to network successfully"))
      .catch((error: unknown) => console.error("switch failed:", error));
    }
  }

  function getFaucet(){
    if(address === ''){
      return;
    }

    setLoading(true);
    let contract = new Contract("0x043af4416e074c08bcde2ae0ba604c767cb19c0f", [
      "function getFaucet() public"
    ], provider);


  }

  return (
    <>
      <h1>Foundry-Facuet</h1>
      <DiscoverWalletProviders/>
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
