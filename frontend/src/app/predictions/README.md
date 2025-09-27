# BetDAG Prediction Feature

This implementation provides the following features for the BetDAG prediction markets:

## Components Created

### 1. PredictionCard Component
- Located at `/components/PredictionCard.tsx`
- Displays prediction cards on the main predictions page
- Shows prediction title, yes/no percentages, AI commentary, and a view details button
- Clicking the card navigates to the prediction detail page

### 2. Predictions Page
- Located at `/app/predictions/page.tsx`
- Lists all active prediction markets
- Shows a grid of prediction cards
- Includes a form to create new predictions (note: only admins can create actual predictions)

### 3. Prediction Detail Page
- Located at `/app/predictions/[id]/page.tsx`
- Shows detailed information about a specific prediction market
- Displays percentages, expiry date, status, AI commentary
- Includes a betting modal for placing bets

## How to Use

1. **View Predictions**
   - Navigate to the `/predictions` page to see all active predictions
   - Click on any prediction card to view its details

2. **Place a Bet**
   - On the prediction detail page, click the "Place Bet" button
   - In the modal, select "Yes" or "No" and enter the amount to bet
   - Click "Confirm Bet" to submit your transaction

3. **View Your Bets**
   - User bets will be visible in the profile section (to be implemented)

## Implementation Details

- Smart contract interaction is handled through wagmi hooks
- Uses data from the PredictionMarket contract (see abi.ts)
- Displays real-time percentages and bet amounts
- Fully responsive design for all screen sizes

## Technical Notes

- The contract address needs to be updated with the actual deployed address
- In a production environment, contract calls should be optimized and batched
- UI follows the design mockup provided, with the bet card matching the shared image

## Todo / Future Enhancements

- Implement proper API endpoints for fetching market data
- Add real-time updates using contract events
- Implement user profile with bet history
- Add a leaderboard based on user statistics