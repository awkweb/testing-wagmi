import * as React from 'react'
import { beforeEach, describe, expect, it } from 'vitest'
import { MockConnector } from 'wagmi/connectors/mock'

import {
  Providers,
  UserEvent,
  act,
  addressRegex,
  getMockWalletClient,
  render,
  screen,
  setupConfig,
  userEvent,
  waitFor,
} from '../test'
import { Connect } from './Connect'

describe('<Connect />', () => {
  let user: UserEvent
  beforeEach(() => {
    user = userEvent.setup()
  })

  it('connects and disconnects wallet', async () => {
    render(<Connect />)

    // Connect to wallet
    const connectButton = screen.getByRole('button', { name: 'Mock' })
    act(() => {
      user.click(connectButton)
    })
    await waitFor(() =>
      expect(screen.getByText(addressRegex)).toBeInTheDocument(),
    )

    // Disconnect
    const disconnectButton = screen.getByRole('button')
    expect(disconnectButton).toHaveTextContent(/disconnect/i)
    user.click(disconnectButton)
    expect(screen.getByRole('button')).toHaveTextContent('Mock')
  })

  it('fails to connect', async () => {
    const config = setupConfig({
      connectors: [
        new MockConnector({
          options: {
            walletClient: getMockWalletClient(),
            // Turn on `failConnect` flag to simulate connect failure
            flags: { failConnect: true },
          },
        }),
      ],
    })

    render(<Connect />, {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <Providers config={config}>{children}</Providers>
      ),
    })

    // Try to connect and check for error message
    const connectButton = screen.getByRole('button', { name: 'Mock' })
    user.click(connectButton)
    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument())
    expect(screen.getByRole('alert')).toHaveTextContent(
      /user rejected the request/i,
    )
  })
})
