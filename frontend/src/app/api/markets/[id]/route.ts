import { NextRequest, NextResponse } from 'next/server';

// Define the market type
interface Market {
  id: number;
  question: string;
  imageUrl: string;
  expiry: number;
  resolved: boolean;
  outcome: boolean | null;
  totalYes: bigint;
  totalNo: bigint;
  yesPercent: number;
  noPercent: number;
  aiCommentary: string;
}

// Mock markets data (replace with actual contract calls in production)
const mockMarkets: Record<string, Market> = {
  "0": {
    id: 0,
    question: "BTC in next 24h",
    imageUrl: "",
    expiry: Math.floor(Date.now() / 1000) + 86400,
    resolved: false,
    outcome: null,
    totalYes: BigInt(3.5 * 10**18),
    totalNo: BigInt(1.8 * 10**18),
    yesPercent: 66,
    noPercent: 34,
    aiCommentary: "ETF rumors spark optimism in BTC."
  },
  "1": {
    id: 1,
    question: "ETH in next 24h",
    imageUrl: "",
    expiry: Math.floor(Date.now() / 1000) + 172800,
    resolved: false,
    outcome: null,
    totalYes: BigInt(2.2 * 10**18),
    totalNo: BigInt(1.8 * 10**18),
    yesPercent: 55,
    noPercent: 45,
    aiCommentary: "Ethereum upgrades gaining momentum but facing resistance."
  },
  "2": {
    id: 2,
    question: "SOL in next 24h",
    imageUrl: "",
    expiry: Math.floor(Date.now() / 1000) + 259200,
    resolved: false,
    outcome: null,
    totalYes: BigInt(5.5 * 10**18),
    totalNo: BigInt(1.8 * 10**18),
    yesPercent: 75,
    noPercent: 25,
    aiCommentary: "Strong ecosystem growth driving Solana price expectations."
  }
};

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const marketId = params.id;
    
    // In a real app, this would fetch data from your smart contract
    // For now, we'll use mock data
    const market = mockMarkets[marketId];
    
    if (!market) {
      return new NextResponse(JSON.stringify({ error: 'Market not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    // Convert BigInt values to strings for JSON serialization
    const serializedMarket = {
      ...market,
      totalYes: market.totalYes.toString(),
      totalNo: market.totalNo.toString()
    };
    
    return new NextResponse(JSON.stringify(serializedMarket), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error fetching market:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to fetch market' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}