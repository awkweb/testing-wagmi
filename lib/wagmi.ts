import { chain, configureChains, createClient } from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { MockConnector } from 'wagmi/connectors/mock'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { publicProvider } from 'wagmi/providers/public'

import { getSigners } from '../test'

const isTest = process.env.NEXT_PUBLIC_PLAYWRIGHT_ENABLED

const { chains, provider, webSocketProvider } = isTest
  ? configureChains(
      [chain.foundry],
      [
        jsonRpcProvider({
          rpc: (chain_) => ({
            http: chain_.rpcUrls.default,
          }),
        }),
      ],
    )
  : configureChains(
      [chain.mainnet, chain.optimism, chain.polygon, chain.rinkeby],
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
  ? [new MockConnector({ options: { signer: getSigners()[0] } })]
  : [
      new MetaMaskConnector({
        chains,
        options: { UNSTABLE_shimOnConnectSelectAccount: true },
      }),
    ]

export const client = createClient({
  autoConnect: !isTest,
  connectors,
  provider,
  webSocketProvider,
})
