"use client";

// Static cryptocurrency data for demonstration purposes

export interface CryptoPriceData {
  timestamp: number;
  price: number;
}

export interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  priceChange24h: number;
  priceChangePercentage24h: number;
  marketCap: number;
  volume24h: number;
  chartData: CryptoPriceData[];
  logoUrl: string;
  isPositive: boolean;
}

// Map coin IDs to their SVG filenames
const COIN_SVG_MAPPING: Record<string, string> = {
  'bitcoin': 'btc.svg',
  'ethereum': 'eth.svg',
  'solana': 'sol.svg',
  'xrp': 'xrp.svg',
  'blockdag': 'blockdag.svg'
};

// Static data for cryptocurrencies
const STATIC_DATA = {
  blockdag: {
    name: 'BlockDAG',
    symbol: 'BDAG',
    price: 38.42,
    marketCap: 25_800_000_000,
    volume24h: 2_400_000_000,
    priceChange24h: 1.42,
    priceChangePercentage24h: 3.84,
  },
  bitcoin: {
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 68452.12,
    marketCap: 1_345_000_000_000,
    volume24h: 42_000_000_000,
    priceChange24h: 1245.32,
    priceChangePercentage24h: 1.85,
  },
  ethereum: {
    name: 'Ethereum',
    symbol: 'ETH',
    price: 3780.45,
    marketCap: 455_000_000_000,
    volume24h: 28_000_000_000,
    priceChange24h: 87.65,
    priceChangePercentage24h: 2.37,
  },
  solana: {
    name: 'Solana',
    symbol: 'SOL',
    price: 212.78,
    marketCap: 93_000_000_000,
    volume24h: 12_500_000_000,
    priceChange24h: 12.45,
    priceChangePercentage24h: 6.21,
  },
  xrp: {
    name: 'XRP',
    symbol: 'XRP',
    price: 0.98,
    marketCap: 52_000_000_000,
    volume24h: 5_800_000_000,
    priceChange24h: 0.04,
    priceChangePercentage24h: 4.26,
  }
};

/**
 * Generate static chart data based on timeframe
 */
const generateChartData = (
  id: keyof typeof STATIC_DATA,
  timeframe: '1D' | '1W' | '1M'
): CryptoPriceData[] => {
  const result: CryptoPriceData[] = [];
  const basePrice = STATIC_DATA[id].price;
  const now = Date.now();
  
  let dataPoints: number;
  let interval: number;
  
  switch(timeframe) {
    case '1D':
      dataPoints = 24;
      interval = 3600 * 1000; // 1 hour
      break;
    case '1W':
      dataPoints = 28;
      interval = 6 * 3600 * 1000; // 6 hours
      break;
    case '1M':
      dataPoints = 30;
      interval = 24 * 3600 * 1000; // 1 day
      break;
  }
  
  // Add small random fluctuations to create a realistic price chart
  let price = basePrice * 0.95; // Start 5% below current price
  
  // Create a seed for each cryptocurrency to ensure consistent charts
  const seed = id.charCodeAt(0) + id.charCodeAt(id.length - 1);
  
  for (let i = 0; i < dataPoints; i++) {
    // Move gradually towards current price
    const targetPrice = basePrice;
    const progressFactor = i / dataPoints;
    const trendComponent = (targetPrice - price) * 0.2 * progressFactor;
    
    // Add randomness that's consistent for each crypto
    const pseudoRandom = Math.sin(seed * i * 0.1) * 0.5 + 0.5;
    const volatility = id === 'blockdag' ? 0.015 : 0.007;
    const randomComponent = price * (pseudoRandom - 0.5) * volatility;
    
    price += trendComponent + randomComponent;
    
    result.push({
      timestamp: now - (dataPoints - i) * interval,
      price: parseFloat(price.toFixed(2))
    });
  }
  
  // Make sure the last price matches the current price
  result.push({
    timestamp: now,
    price: basePrice
  });
  
  return result;
};

/**
 * Get data for all cryptocurrencies
 */
export const getCryptoData = async (timeframe: '1D' | '1W' | '1M' = '1D'): Promise<CryptoData[]> => {
  // Simulate network delay for a more realistic experience
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return Object.keys(STATIC_DATA).map(id => {
    const data = STATIC_DATA[id as keyof typeof STATIC_DATA];
    const chartData = generateChartData(id as keyof typeof STATIC_DATA, timeframe);
    const svgPath = COIN_SVG_MAPPING[id] || `${id}.svg`;
    
    return {
      id,
      name: data.name,
      symbol: data.symbol,
      price: data.price,
      priceChange24h: data.priceChange24h,
      priceChangePercentage24h: data.priceChangePercentage24h,
      marketCap: data.marketCap,
      volume24h: data.volume24h,
      chartData: chartData,
      logoUrl: `/${svgPath}`,
      isPositive: data.priceChangePercentage24h >= 0
    };
  });
};

/**
 * Get chart data for a specific cryptocurrency
 */
export const getCryptoChartData = async (
  cryptoId: string,
  timeframe: '1D' | '1W' | '1M' = '1D'
): Promise<CryptoPriceData[]> => {
  // Simulate network delay for a more realistic experience
  await new Promise(resolve => setTimeout(resolve, 200));
  
  if (cryptoId in STATIC_DATA) {
    return generateChartData(cryptoId as keyof typeof STATIC_DATA, timeframe);
  }
  
  return [];
};

/**
 * Calculate 24h change based on chart data
 */
const calculate24hChange = (chartData: CryptoPriceData[]): [number, number] => {
  if (chartData.length < 2) return [0, 0];
  
  const startPrice = chartData[0].price;
  const currentPrice = chartData[chartData.length - 1].price;
  const change = currentPrice - startPrice;
  const percentage = (change / startPrice) * 100;
  
  return [change, percentage];
};

/**
 * Sets up a polling interval to simulate live price updates
 */
export const subscribeToLivePriceUpdates = (
  callback: (data: CryptoData) => void,
  cryptoId: string = "blockdag"
): (() => void) => {
  // Get base data
  const data = STATIC_DATA[cryptoId as keyof typeof STATIC_DATA] || STATIC_DATA.bitcoin;
  let lastPrice = data.price;
  let lastUpdate = Date.now();
  
  // Poll for updates every few seconds
  const interval = setInterval(async () => {
    try {
      // Simulate price movement
      const now = Date.now();
      const secondsElapsed = (now - lastUpdate) / 1000;
      lastUpdate = now;
      
      // More volatility for BlockDAG
      const volatility = cryptoId === 'blockdag' ? 0.002 : 0.0008;
      
      // Simulate price movement
      const changePercent = (Math.random() - 0.48) * volatility * secondsElapsed;
      const newPrice = lastPrice * (1 + changePercent);
      lastPrice = parseFloat(newPrice.toFixed(2));
      
      // Get chart data
      let chartData = await getCryptoChartData(cryptoId, '1D');
      
      // Update latest price point
      if (chartData.length > 0) {
        chartData[chartData.length - 1].price = lastPrice;
      }
      
      // Calculate 24h change
      const [priceChange, percentageChange] = calculate24hChange(chartData);
      
      // Get the correct SVG path from our mapping
      const svgPath = COIN_SVG_MAPPING[cryptoId] || `${cryptoId}.svg`;
      
      // Generate updated data
      const cryptoData: CryptoData = {
        id: cryptoId,
        name: data.name,
        symbol: data.symbol,
        price: lastPrice,
        priceChange24h: priceChange,
        priceChangePercentage24h: percentageChange,
        marketCap: data.marketCap,
        volume24h: data.volume24h,
        chartData: chartData,
        logoUrl: `/${svgPath}`,
        isPositive: percentageChange >= 0
      };
      
      callback(cryptoData);
    } catch (error) {
      console.error('Error in live updates:', error);
    }
  }, 3000);
  
  return () => clearInterval(interval);
};