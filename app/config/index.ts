import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, sepolia, bitcoin } from '@reown/appkit/networks'
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient()

const projectId = 'NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID'

export const wagmiAdapter = new WagmiAdapter({
    networks: [mainnet, sepolia],
    projectId
})

const metadata = {
    name: 'KymCoin Wallet',
    description: 'Multi-Chain Web3 Trading Platform',
    url: 'https://kymcoin-wallet.vercel.app'
    icons: ['https://avatars.githubusercontent.com/u/179229932']
}

export const modal = createAppKit({
    adapters: [wagmiAdapter],
    networks: [mainnet, sepolia, bitcoin],
    metadata,
    projectId,
    features: {
        analytics: true,
        swaps: true,
        onramp: true
    }
})