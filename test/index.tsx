import { RenderOptions, render } from '@testing-library/react'
import { default as userEvent } from '@testing-library/user-event'
import * as React from 'react'

import {
  CreateConfigParameters,
  WagmiConfig,
  WagmiConfigProps,
  WalletClient,
  createConfig,
} from 'wagmi'
import { MockConnector } from 'wagmi/connectors/mock'

import { getMockWalletClient, getPublicClient } from './utils'

type SetupClient = Partial<CreateConfigParameters> & {
  walletClient?: WalletClient
}
export function setupConfig({
  walletClient = getMockWalletClient(),
  ...config
}: SetupClient = {}) {
  return createConfig({
    connectors: [new MockConnector({ options: { walletClient } })],
    publicClient: ({ chainId }) => getPublicClient({ chainId }),
    ...config,
  })
}

type ProvidersProps = {
  children: React.ReactNode
  config?: WagmiConfigProps['config']
}
export function Providers({
  children,
  config = setupConfig(),
}: ProvidersProps) {
  return <WagmiConfig config={config}>{children}</WagmiConfig>
}

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: Providers, ...options })

export * from '@testing-library/react'
export { customRender as render }

export type UserEvent = ReturnType<typeof userEvent.setup>
export { default as userEvent } from '@testing-library/user-event'

export { addressRegex, getMockWalletClient } from './utils'
