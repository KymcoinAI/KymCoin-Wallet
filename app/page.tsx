"use client";
import { ConnectKitButton } from "connectkit";
import Image from "next/image";
import { useAccount, useBalance, useConnect, useDisconnect } from "wagmi";
import { formatUnits } from "viem";

export default function Home() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });
  return (
    <div>
      <p>KymCoin Wallet</p>
      <ConnectKitButton />
      {isConnected && address && (
        <div>
          <p>Address: {address}</p>
          <p>Balance: {balance ? formatUnits(balance.value, balance.decimals) : "Loading..."} {balance?.symbol}</p>
        </div>
      )}
    </div>
  );
}