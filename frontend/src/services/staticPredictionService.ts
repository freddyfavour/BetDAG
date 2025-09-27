// staticPredictionService.ts
// This service provides static prediction data for static builds

interface Prediction {
  symbol: string;
  name: string;
  currentPrice: number;
  prediction: string;
  sentiment: string;
  probabilityUp: number;
  shortTermTarget: number;
  longTermTarget: number;
}

export async function getPredictions(): Promise<Prediction[]> {
  // In a static build, we'll fetch from the static JSON file
  try {
    const response = await fetch('/data/predictions.json');
    const data = await response.json();
    return data.predictions;
  } catch (error) {
    console.error('Error fetching static predictions:', error);
    return [];
  }
}

export async function getPredictionBySymbol(symbol: string): Promise<Prediction | null> {
  try {
    const predictions = await getPredictions();
    return predictions.find(p => p.symbol.toLowerCase() === symbol.toLowerCase()) || null;
  } catch (error) {
    console.error(`Error fetching prediction for ${symbol}:`, error);
    return null;
  }
}