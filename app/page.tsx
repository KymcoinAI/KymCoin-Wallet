"use client";
import { ConnectKitButton } from "connectkit";
import Image from "next/image";
import { useAccount, useBalance, useConnect, useDisconnect } from "wagmi";
import { formatUnits } from "viem";
import { getAllBalances } from "viem/zksync";
import { mainnet, sepolia } from "wagmi/chains";

export default function Home() {
  const { address, isConnected, chainId } = useAccount();
  const { data: balance, isLoading, isError } = useBalance({ 
    address, 
    chainId, 
    query: { enabled: isConnected } 
  });

  let displayBalance = "No balance data";

  if (isLoading) {
    displayBalance = "Loading...";
  } else if (isError) {
    displayBalance = "Error loading balance";
  } else if (balance) {
    displayBalance = `${formatUnits(balance.value, balance.decimals)} ${balance.symbol ?? ""}`;
  }

  return (
    <div>
      <p>KymCoin Wallet</p>
      <ConnectKitButton />
      {isConnected && address && (
        <div>
          <p>Address: {address}</p>
          <p>Balance: {displayBalance}
          </p>
        </div>
      )}
    </div>
  );
}