"use client";

import { useEffect, useState } from "react";
import { useAccount, useContractRead } from "wagmi";
import { abi } from "@/constants/abi";

// Define the contract address
const CONTRACT_ADDRESS = "0xYourContractAddress"; // Replace with actual address when deployed

export function useIsAdmin() {
  const { address } = useAccount();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  // Contract read for owner check
  const { data: ownerAddress } = useContractRead({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi,
    functionName: "owner"
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Check if user is admin
  useEffect(() => {
    if (mounted && address && ownerAddress) {
      setIsAdmin(address.toLowerCase() === (ownerAddress as string).toLowerCase());
    }
  }, [address, ownerAddress, mounted]);

  return {
    isAdmin,
    ownerAddress,
    isLoading: !mounted
  };
}