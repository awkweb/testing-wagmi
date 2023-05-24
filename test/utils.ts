import { createPublicClient, createWalletClient, http } from 'viem'
import { foundry } from 'viem/chains'
import * as chains from 'viem/chains'

export const addressRegex = /^0x[a-fA-F0-9]{40}/

export const getMockWalletClient = () =>
  createWalletClient({
    transport: http(foundry.rpcUrls.default.http[0]),
    chain: foundry,
    account: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    key: '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
    pollingInterval: 100,
  })

export const getPublicClient = ({
  chainId = foundry.id,
}: {
  chainId?: number
}) => {
  const chain = Object.entries(chains).find(
    ([_, chain]) => chain.id === chainId,
  )?.[1]
  if (!chain) throw new Error(`Chain ${chainId} not found`)

  return createPublicClient({
    transport: http(foundry.rpcUrls.default.http[0]),
    chain,
    pollingInterval: 100,
  })
}
