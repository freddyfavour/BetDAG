// PredictionMarket Contract ABI
export const abi = [
  {
    inputs: [
      { internalType: "address", name: "_treasury", type: "address" },
      { internalType: "uint256", name: "_initialFeeBps", type: "uint256" }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      { indexed: true, internalType: "uint256", name: "marketId", type: "uint256" },
      { indexed: true, internalType: "uint256", name: "betId", type: "uint256" },
      { indexed: false, internalType: "bool", name: "optionYes", type: "bool" },
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "BetPlaced",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      { indexed: true, internalType: "uint256", name: "betId", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "payout", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "fee", type: "uint256" }
    ],
    name: "Claimed",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "newFeeBps", type: "uint256" }
    ],
    name: "FeeUpdated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "marketId", type: "uint256" },
      { indexed: false, internalType: "string", name: "question", type: "string" },
      { indexed: false, internalType: "string", name: "imageUrl", type: "string" },
      { indexed: false, internalType: "uint256", name: "expiry", type: "uint256" }
    ],
    name: "MarketCreated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "marketId", type: "uint256" },
      { indexed: false, internalType: "enum PredictionMarket.Outcome", name: "outcome", type: "uint8" }
    ],
    name: "MarketResolved",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "address", name: "newTreasury", type: "address" }
    ],
    name: "TreasuryUpdated",
    type: "event"
  },
  { stateMutability: "payable", type: "fallback" },
  // ...existing code...
];
