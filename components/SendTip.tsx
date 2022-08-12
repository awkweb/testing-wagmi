import { parseEther } from 'ethers/lib/utils'
import * as React from 'react'
import {
  useAccount,
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
} from 'wagmi'

type Props = {
  defaultValue?: string
  to?: `0x${string}` | `${string}.eth`
}

export function SendTip({
  defaultValue = '0.01',
  to = '0xd2135cfb216b74109775236e36d4b433f1df507b', // wagmi-dev.eth
}: Props) {
  const { isConnected } = useAccount()
  const [value, setValue] = React.useState(defaultValue)

  const { config } = usePrepareSendTransaction({
    request: {
      to,
      value: value ? parseEther(value) : undefined,
    },
    enabled: isConnected,
  })

  const {
    data: transaction,
    sendTransaction,
    isLoading: transactionLoading,
    error: transactionError,
  } = useSendTransaction(config)

  const {
    isLoading: waitLoading,
    error: waitError,
    isSuccess: waitSuccess,
  } = useWaitForTransaction({
    hash: transaction?.hash,
  })

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          sendTransaction?.()
        }}
      >
        <h2>Send tip</h2>

        <fieldset>
          <label htmlFor="amount">Tip Amount</label>
          <input
            name="amount"
            value={value}
            placeholder="0.01"
            onChange={(event) => setValue(event.target.value)}
            required
            type="number"
            step={0.01}
          />
        </fieldset>

        <button disabled={!sendTransaction || transactionLoading}>
          {transactionLoading ? 'Check Wallet' : 'Send Tip'}
        </button>
      </form>

      {waitLoading && <div>Transaction pending…</div>}
      {waitSuccess && <div>Transaction confirmed!</div>}

      {transactionError && (
        <div role="alert">Transaction error: {transactionError.message}</div>
      )}
      {waitError && (
        <div role="alert">Tranaction error: {waitError.message}</div>
      )}
    </div>
  )
}
