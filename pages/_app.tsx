import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { WagmiConfig } from 'wagmi'

import { config } from '../lib/wagmi'

function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={config}>
      <Component {...pageProps} />
    </WagmiConfig>
  )
}

export default App
