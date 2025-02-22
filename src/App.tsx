import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { testNet } from './chain';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { ConnectBtn } from './components/ConnectBtn';

const config = getDefaultConfig({
  appName: 'Foundry-Faucet',
  projectId: import.meta.env.WALL_CONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
  chains: [testNet],
  ssr: false, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();


const App = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <ConnectBtn />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default App;