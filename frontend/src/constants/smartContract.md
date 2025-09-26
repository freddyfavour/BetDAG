# Prediction Market Smart Contract

This contract powers a decentralized prediction market where users can create markets, place bets, resolve outcomes, and claim rewards.
It is designed to be called directly from a frontend (React/Next.js, Wagmi, ethers.js, web3modal, etc.).

---

## 📦 Deployment Info

* **EVM Version**: `london`
* **Solidity Compiler**: `0.8.26+commit.8a97fa7a`
* **License**: MIT
* **Contract Name**: `PredictionMarket`

---

## 🔑 Core Concepts

* **Markets**: Questions users can bet on (e.g. *Will ETH > $3k by Friday?*).
* **Bets**: Each bet is tied to a user, market, choice (`Yes` or `No`), and amount.
* **Resolution**: When a market expires, the owner/admin can resolve it with the outcome.
* **Claiming**: Winners claim payouts once markets are resolved.
* **Treasury & Fees**: A fee (in basis points, bps) goes to the treasury address.

---

## 📜 Events (for listening in frontend)

* **`MarketCreated(marketId, question, imageUrl, expiry)`** – fires when a new market is created.
* **`BetPlaced(user, marketId, betId, optionYes, amount)`** – when a bet is placed.
* **`MarketResolved(marketId, outcome)`** – when the owner resolves a market.
* **`Claimed(user, betId, payout, fee)`** – when a user successfully claims winnings.
* **`FeeUpdated(newFeeBps)`** – when admin updates fee.
* **`TreasuryUpdated(newTreasury)`** – when admin updates treasury address.

Use these with `contract.on("EventName", callback)` in ethers.js or Wagmi.

---

## ⚡ Public Functions

### 1. Market Management

* **`createMarket(string _question, string _imageUrl, uint256 _expiry)`**

  * Creates a new market.
  * Only owner/admin should call this.
  * `_expiry` is a UNIX timestamp.

* **`resolveMarket(uint256 _marketId, bool _outcome)`**

  * Resolves a market as **Yes (true)** or **No (false)**.
  * Only owner/admin should call this.

---

### 2. Betting

* **`placeBet(uint256 _marketId, bool _choice)`** *(payable)*

  * Users call this to bet **Yes** (`true`) or **No** (`false`).
  * Must send ETH along with transaction (`value` = bet amount).
  * Emits `BetPlaced`.

* **`claim(uint256 _betId)`**

  * After a market is resolved, winners call this to claim rewards.
  * Emits `Claimed`.

---

### 3. Views (Read-Only Helpers for Frontend)

* **`getMarket(uint256 _marketId)`**
  Returns:

  * `id, question, imageUrl, expiry, resolved, outcome, totalYes, totalNo`

* **`getMarketTotalsAndPercents(uint256 _marketId)`**
  Returns:

  * `totalYes, totalNo, yesPercent, noPercent`

* **`getBet(uint256 _betId)`**
  Returns:

  * `betId, marketId, user, optionYes, amount, claimed`

* **`getUserBetIds(address _user)`**
  Returns:

  * array of betIds belonging to a user.

* **`getUserStats(address _user)`**
  Returns:

  * `totalBets, totalWins, totalLosses, totalEarnings`

* **`getCounts()`**
  Returns:

  * `marketCount, betCount`

* **`nextMarketId()` / `nextBetId()`**
  Returns:

  * IDs for the next market or bet.

---

### 4. Admin Functions

* **`setFeeBps(uint256 _feeBps)`** – update fee (in basis points, e.g. 200 = 2%).
* **`setTreasury(address _treasury)`** – update treasury wallet.
* **`feeBps()`** – view current fee.
* **`treasury()`** – view treasury address.
* **`owner()`** – view contract owner.

---

## 🔧 Example Frontend Calls

### Connect Wallet

```ts
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
```

### Fetch All Markets

```ts
const marketCount = await contract.getCounts().then(c => c.marketCount);
for (let i = 0; i < marketCount; i++) {
  const market = await contract.getMarket(i);
  console.log(market.question, market.totalYes, market.totalNo);
}
```

### Place a Bet

```ts
await contract.placeBet(marketId, true, { value: ethers.utils.parseEther("0.1") });
```

### Claim Winnings

```ts
await contract.claim(betId);
```

### Get User Stats

```ts
const stats = await contract.getUserStats(userAddress);
console.log(stats.totalWins.toString());
```

---

## 🌐 Suggested Frontend Pages

* **Predictions**: List of `getMarket()` calls.
* **Prediction Detail**: Single `getMarket(id)`, with `placeBet`.
* **Stats**: Use `getCounts()`, aggregate totals.
* **Leaderboard**: Use `getUserStats()` (may need off-chain sorting).
* **Profile**: `getUserBetIds(user) + getBet(id)`.
