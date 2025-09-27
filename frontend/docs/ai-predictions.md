# BetDAG AI Prediction System

This document explains how the AI prediction system works in the BetDAG platform.

## Overview

The BetDAG AI Prediction system uses Google's Gemini API to generate cryptocurrency market predictions. These predictions include:

1. The probability of price movement (up or down)
2. AI commentary explaining the prediction
3. Market data used to inform the prediction

## Components

### 1. Gemini API Service

Located at `/services/geminiService.ts`, this service:

- Initializes the Gemini API client using the API key from environment variables
- Fetches market data for cryptocurrencies (either from an API or mock data)
- Sends prompts to Gemini to generate predictions
- Formats and returns the prediction data

### 2. API Routes

- `/api/predictions` - Returns predictions for multiple cryptocurrencies
- `/api/predictions/[symbol]` - Returns a prediction for a specific cryptocurrency (e.g., bitcoin, ethereum)

### 3. Frontend Integration

The predictions are integrated into the UI in two places:

- **Predictions Page**: Shows cards with predictions for different cryptocurrencies
- **Prediction Detail Page**: Shows detailed information about a specific prediction

## Response Format

The AI prediction response follows this format:

```json
{
  "symbol": "ethereum",
  "timestamp": "2025-09-27T09:48:25.528080+00:00",
  "probability_up": 60,
  "probability_down": 40,
  "commentary": "Ethereum shows positive momentum with a 2.06% increase in the last 24 hours and high trading volume, indicating strong buying pressure. However, the large market cap suggests that significant further gains may be harder to achieve in the short term, and some profit-taking is likely. Therefore, while upside is favored, downside risk remains substantial.",
  "source_data": {
    "symbol": "ETHEREUM",
    "coin_id": "ethereum",
    "price_usd": 3993.74,
    "24h_change_pct": 2.0564401319495005,
    "volume_24h": 33217251820.378788,
    "market_cap": 481801741204.291,
    "last_updated": "2025-09-27T09:47:53+00:00",
    "analysis_timestamp": "2025-09-27T09:48:22.337562+00:00"
  }
}
```

## Implementation Details

1. **AI Prompt Engineering**: The system sends a carefully crafted prompt to the Gemini API that includes market data and instructions for the format of the response.

2. **Error Handling**: If the API fails, the system falls back to default predictions.

3. **Integration with Smart Contract**: The prediction percentages (probability_up and probability_down) are used to display the odds on prediction cards and can be used to calculate betting odds.

## Setup

1. Ensure the GEMINI_API_KEY is set in your `.env.local` file
2. Install the required package: `npm install @google/generative-ai`
3. Restart your development server

## Supported Cryptocurrencies

Currently, the system supports predictions for:
- Bitcoin (BTC)
- Ethereum (ETH)
- Solana (SOL)
- XRP (Ripple)

More can be added by extending the market data source and symbol mappings.