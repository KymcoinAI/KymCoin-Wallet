"use client";
import { AppKitButton, AppKitNetworkButton, useAppKitAccount } from "@reown/appkit/react";
import Image from "next/image";
import { useAccount, useBalance, useConnect, useDisconnect } from "wagmi";
import { formatUnits } from "viem";

export default function Home() {
  const { address, isConnected, caipAddress } = useAppKitAccount();

const{ address: evmAddress, chainId: evmChainId, isConnected: isEvmConnected } = useAccount();
const isEvm = caipAddress?.startsWith("eip155");

  const { data: balance, isLoading, isError } = useBalance({ 
    address: evmAddress, 
    chainId: evmChainId, 
    query: { enabled: Boolean(isConnected && isEvm) } 
  });

  let displayBalance = "No balance data";

  if (!isEvm && isConnected) {
    displayBalance = "Bitcoin Connected (Fetch via BTC API)";
  } else if (isLoading) {
    displayBalance = "Loading...";
  } else if (isError) {
    displayBalance = "Error loading balance";
  } else if (balance) {
    displayBalance = `${formatUnits(balance.value, balance.decimals)} ${balance.symbol ?? ""}`;
  }

  return (
    <div className="p-6 space-y-4">
      <p className="text-xl font-bold">KymCoin Wallet</p>
    
<div className="flex items-center gap-3">
        <AppKitButton />
        <AppKitNetworkButton />
</div>

      {isConnected && address && (
        <div className="mt-4 p-4 border rounded-lg bg-gray-100">
          <p>Address: {address}</p>
          <p>Balance: {displayBalance}
          </p>
        </div>
      )}
    </div>
  );
}