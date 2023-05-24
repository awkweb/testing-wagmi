import { configureChains, createConfig } from 'wagmi'
import { foundry, mainnet, optimism, polygon } from 'wagmi/chains'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { MockConnector } from 'wagmi/connectors/mock'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { publicProvider } from 'wagmi/providers/public'

import { getMockWalletClient } from '../test/utils'

const isTest = process.env.NEXT_PUBLIC_PLAYWRIGHT_ENABLED

const { chains, publicClient, webSocketPublicClient } = isTest
  ? configureChains(
      [foundry],
      [
        jsonRpcProvider({
          rpc: (chain_) => ({
            http: chain_.rpcUrls.default.http[0],
          }),
        }),
      ],
    )
  : configureChains(
      [mainnet, optimism, polygon],
      [
        alchemyProvider({
          // This is Alchemy's default API key.
          // You can get your own at https://dashboard.alchemyapi.io
          apiKey: '_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC',
        }),
        publicProvider(),
      ],
    )

const connectors = isTest
  ? [new MockConnector({ options: { walletClient: getMockWalletClient() } })]
  : [
      new MetaMaskConnector({
        chains,
        options: { UNSTABLE_shimOnConnectSelectAccount: true },
      }),
    ]

export const config = createConfig({
  autoConnect: !isTest,
  connectors,
  publicClient,
  webSocketPublicClient,
})
