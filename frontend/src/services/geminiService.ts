import { GoogleGenerativeAI } from '@google/generative-ai';

// Define types for market data
interface CryptoMarketData {
  symbol: string;
  coin_id: string;
  price_usd: number;
  "24h_change_pct": number;
  volume_24h: number;
  market_cap: number;
  last_updated: string;
  analysis_timestamp: string;
}

interface MarketDataCollection {
  [key: string]: CryptoMarketData;
}

// Initialize the Gemini API client
export const initGeminiAI = () => {
  // First check for real API key in environment
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.warn('GEMINI_API_KEY is not defined in environment variables, using fallback mock responses');
    // Return a minimal implementation that will allow the app to work without an API key
    return {
      getGenerativeModel: () => ({
        generateContent: async () => ({
          response: {
            text: () => JSON.stringify({
              probability_up: 55,
              probability_down: 45,
              commentary: "Mock AI prediction (no API key): Market sentiment is cautiously optimistic with technical indicators showing moderate bullish momentum."
            })
          }
        })
      })
    } as unknown as GoogleGenerativeAI;
  }
  
  return new GoogleGenerativeAI(apiKey);
};

// Get market data for a specific crypto
export const getCryptoMarketData = async (symbol: string): Promise<CryptoMarketData> => {
  try {
    // In a real application, this would fetch from a crypto API
    // For this demo, we'll use mock data with slight variations
    const mockData: MarketDataCollection = {
      bitcoin: {
        symbol: "BITCOIN",
        coin_id: "bitcoin",
        price_usd: 64250 + (Math.random() * 2000 - 1000),
        "24h_change_pct": 2.35 + (Math.random() * 2 - 1),
        volume_24h: 45217251820.37 + (Math.random() * 5000000000),
        market_cap: 1281801741204.29 + (Math.random() * 10000000000),
        last_updated: new Date().toISOString(),
        analysis_timestamp: new Date().toISOString()
      },
      ethereum: {
        symbol: "ETHEREUM",
        coin_id: "ethereum",
        price_usd: 3993.74 + (Math.random() * 200 - 100),
        "24h_change_pct": 2.05 + (Math.random() * 2 - 1),
        volume_24h: 33217251820.37 + (Math.random() * 3000000000),
        market_cap: 481801741204.29 + (Math.random() * 5000000000),
        last_updated: new Date().toISOString(),
        analysis_timestamp: new Date().toISOString()
      },
      solana: {
        symbol: "SOLANA",
        coin_id: "solana",
        price_usd: 189.74 + (Math.random() * 15 - 7.5),
        "24h_change_pct": 3.75 + (Math.random() * 3 - 1.5),
        volume_24h: 5217251820.37 + (Math.random() * 1000000000),
        market_cap: 81801741204.29 + (Math.random() * 1000000000),
        last_updated: new Date().toISOString(),
        analysis_timestamp: new Date().toISOString()
      },
      ripple: {
        symbol: "XRP",
        coin_id: "ripple",
        price_usd: 0.63 + (Math.random() * 0.05 - 0.025),
        "24h_change_pct": 1.05 + (Math.random() * 2 - 1),
        volume_24h: 2217251820.37 + (Math.random() * 500000000),
        market_cap: 34801741204.29 + (Math.random() * 1000000000),
        last_updated: new Date().toISOString(),
        analysis_timestamp: new Date().toISOString()
      }
    };
    
    const normalizedSymbol = symbol.toLowerCase();
    return (normalizedSymbol in mockData) ? mockData[normalizedSymbol as keyof typeof mockData] : mockData.bitcoin;
  } catch (error) {
    console.error("Error fetching crypto market data:", error);
    throw error;
  }
};

// Generate AI prediction and commentary for a crypto asset
export const generateAIPrediction = async (symbol: string) => {
  try {
    const normalizedSymbol = symbol ? symbol.toLowerCase() : 'bitcoin'; // Default to bitcoin if no symbol provided
    const genAI = initGeminiAI();
    // Use gemini-pro instead of gemini-1.5-flash as it's supported in the v1beta API
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `You are a cryptocurrency prediction AI. Based on the latest market data, 
    predict the price movement for ${normalizedSymbol} in the next 24 hours. 
    Provide the probability (percentage) of the price going up or down, and a brief commentary.
    Format your response as a JSON object with the following structure:
    {
      "probability_up": number,
      "probability_down": number,
      "commentary": string
    }
    The probabilities should add up to 100%.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      // Parse the JSON response
      const parsedResponse = JSON.parse(text);
      // Make sure to include the symbol in the response
      return {
        ...parsedResponse,
        symbol: normalizedSymbol
      };
    } catch (jsonError) {
      console.error('Error parsing AI response as JSON:', jsonError);
      console.log('Raw response:', text);
      
      // Fallback response when JSON parsing fails
      return {
        probability_up: 50,
        probability_down: 50,
        commentary: 'Unable to parse AI prediction response.',
        symbol: normalizedSymbol
      };
    }
  } catch (error) {
    console.error('Error generating AI prediction:', error);
    return {
      probability_up: 50,
      probability_down: 50,
      commentary: 'Unable to generate prediction at this time.',
      symbol: symbol ? symbol.toLowerCase() : 'bitcoin' // Ensure symbol is always returned
    };
  }
};