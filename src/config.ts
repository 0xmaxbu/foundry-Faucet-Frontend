import { http, createConfig } from 'wagmi'
import { testNet } from './chain'
import { walletConnect } from 'wagmi/connectors'

export const config = createConfig({
  chains: [testNet],
  connectors: [
    walletConnect({
      projectId: import.meta.env.WALL_CONNECT_PROJECT_ID,
    })
  ],
  transports: {
    [testNet.id]: http(),
  },
})