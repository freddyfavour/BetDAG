import { NextRequest, NextResponse } from 'next/server';
import { generateAIPrediction } from '@/services/geminiService';

export const GET = async (
  req: NextRequest,
  { params }: { params: { symbol: string } }
) => {
  try {
    const symbol = params.symbol;
    
    if (!symbol) {
      return new NextResponse(JSON.stringify({ error: 'Symbol is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Generate AI prediction for the symbol
    const prediction = await generateAIPrediction(symbol);

    return new NextResponse(JSON.stringify(prediction), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("Error in AI prediction API:", error);
    return new NextResponse(JSON.stringify({ error: 'Failed to generate prediction' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};