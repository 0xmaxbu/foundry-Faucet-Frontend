import { defineChain } from 'viem'

export const testNet = defineChain({
  id: 15511,
  name: 'maxbu-mainnet',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://virtual.mainnet.rpc.tenderly.co/45413366-6994-4e16-aee3-52d53ad0f62f'] },
  },
  blockExplorers: {
    default: { name: 'Etherscan', url: 'https://etherscan.io' },
  },
  contracts: {},
})