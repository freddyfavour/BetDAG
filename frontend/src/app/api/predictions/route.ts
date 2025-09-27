import { NextRequest, NextResponse } from 'next/server';
import { generateAIPrediction } from '@/services/geminiService';

export const GET = async (req: NextRequest) => {
  try {
    // Get supported symbols
    const symbols = ['bitcoin', 'ethereum', 'solana', 'ripple'];
    
    // Get the symbol from the query param or default to getting predictions for all symbols
    const { searchParams } = new URL(req.url);
    const symbol = searchParams.get('symbol');
    
    if (symbol) {
      // Generate prediction for a single symbol
      const prediction = await generateAIPrediction(symbol);
      return NextResponse.json(prediction);
    } else {
      // Generate predictions for all symbols (limit to 3 for performance)
      const limitedSymbols = symbols.slice(0, 3);
      const predictions = await Promise.all(
        limitedSymbols.map(async (sym) => {
          return generateAIPrediction(sym);
        })
      );
      
      return NextResponse.json(predictions);
    }
  } catch (error) {
    console.error("Error in predictions API:", error);
    return NextResponse.json(
      { error: 'Failed to generate predictions' },
      { status: 500 }
    );
  }
};