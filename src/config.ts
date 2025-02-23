import { http, createConfig } from 'wagmi'
import { testNet } from './chain'

export const config = createConfig({
  chains: [testNet],
  transports: {
    [testNet.id]: http(),
  },
})