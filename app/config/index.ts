import { createAppKit, type CaipNetwork } from '@reown/appkit/react'
import { BitcoinAdapter } from '@reown/appkit-adapter-bitcoin'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import {SolanaAdapter} from '@reown/appkit-adapter-solana'
import { AppKitNetwork, bitcoin, mainnet, sepolia, solana } from '@reown/appkit/networks'
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient()

export const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID'

export const wagmiAdapter = new WagmiAdapter({
    networks: [mainnet, sepolia],
    projectId
})

export const bitcoinNetworks = [bitcoin] as unknown as CaipNetwork[]
export const bitcoinAdapter = new BitcoinAdapter({
    projectId,
    networks: bitcoinNetworks
})

export const solanaAdapter = new SolanaAdapter()

export const networks = [mainnet, sepolia, bitcoin, solana] as unknown as [CaipNetwork, ...CaipNetwork[]]

const metadata = {
    name: 'KymCoin Wallet',
    description: 'Multi-Chain Web3 Trading Platform',
    url: 'https://kymcoin-wallet.vercel.app',
    icons: ['https://avatars.githubusercontent.com/u/179229932']
}

export const modal = createAppKit({
    adapters: [wagmiAdapter, bitcoinAdapter, solanaAdapter],
    networks,
    projectId,
    features: {
        analytics: true,
        swaps: true,
        onramp: true
    }
})