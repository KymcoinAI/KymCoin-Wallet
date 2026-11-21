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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">

      <h1 className="text-3xl font-bold text-amber-500 mb-6">KymCoin Wallet</h1>
    
<div className="flex flex-wrap items-center justify-center gap-3 bg-amber-800 p-3 rounded-2xl shadow-md">
        <AppKitButton />
        <AppKitNetworkButton />
</div>

      {isConnected && address && (
        <div className="mt-6 p-5 border border-amber-200 rounded-xl bg-white shadow-sm text-center max-w-md w-full">
          <p className="text-sm text-gray-600 break-all mb-2">
            <span className="font-semibold text-gray-800">Address:</span> {address}
          </p>
          <p className="text-lg font-bold text-amber-700">Balance: {displayBalance}</p>
        </div>
      )}
    </div>
  );
}