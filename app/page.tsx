"use client";
import { ConnectKitButton } from "connectkit";
import Image from "next/image";
import { useAccount, useBalance, useConnect, useDisconnect } from "wagmi";
import { formatUnits } from "viem";
import { getAllBalances } from "viem/zksync";

export default function Home() {
  const { address, isConnected } = useAccount();
  const { data: balance, isLoading, isError } = useBalance({ address });
  return (
    <div>
      <p>KymCoin Wallet</p>
      <ConnectKitButton />
      {isConnected && address && (
        <div>
          <p>Address: {address}</p>
          <p>Balance: {isLoading ? ( 
            "Loading..."
           ) :isError ? (
            "Error loading balance"
           ) : balance ? (
            '${formatUnits(balance.value, balance.decimals)} ${balance.symbol ?? ""}'
           ) : (
            "No balance data"
            )}
            </p>
        </div>
      )}
    </div>
  );
}