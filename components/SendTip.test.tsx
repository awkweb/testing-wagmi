import * as React from 'react'
import { beforeEach, describe, expect, it } from 'vitest'

import {
  UserEvent,
  addressRegex,
  render,
  screen,
  userEvent,
  waitFor,
} from '../test'
import { Connect } from './Connect'
import { SendTip } from './SendTip'

describe('<SendTip />', () => {
  let user: UserEvent
  beforeEach(() => {
    user = userEvent.setup()
  })

  it('sends tip', async () => {
    render(
      <>
        <Connect />
        <SendTip />
      </>,
    )

    // "Send Tip" button disabled when wallet is not connected
    const sendTipButton = screen.getByRole('button', { name: 'Send Tip' })
    expect(sendTipButton).toBeDisabled()

    // Connect to wallet
    const connectButton = screen.getByRole('button', { name: 'Mock' })
    user.click(connectButton)
    await waitFor(() =>
      expect(screen.getByText(addressRegex)).toBeInTheDocument(),
    )

    // Send transaction
    await waitFor(() => expect(sendTipButton).not.toBeDisabled())
    user.click(sendTipButton)
    await waitFor(() =>
      expect(screen.getByText(/transaction pending/i)).toBeInTheDocument(),
    )
    await waitFor(() =>
      expect(screen.getByText(/transaction confirmed/i)).toBeInTheDocument(),
    )
  })
})
