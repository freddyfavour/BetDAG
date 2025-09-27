# BetDAG 🎯

![BetDAG Logo](/frontend/public/BetDAG%20logo.png)

## Cryptocurrency Prediction Market Platform

BetDAG is an innovative AI-powered prediction market platform built on BlockDAG technology that allows users to make and bet on cryptocurrency price predictions. This project was created for the BlockDAG Hackathon with the theme "Prediction Markets".

## Live demo
https://betdag.vercel.app/

## 🌟 Overview

BetDAG leverages the power of blockchain technology and artificial intelligence to create a transparent, secure, and engaging platform where users can:

- Make predictions about cryptocurrency price movements
- Bet on market outcomes using BlockDAG technology
- Compete on leaderboards to showcase prediction accuracy
- Access AI-powered insights to inform betting decisions
- Connect their wallets for seamless transactions

## 🔧 Technology Stack

The project is built using a comprehensive tech stack:

### Frontend
- **Next.js** - React framework for building the user interface
- **Tailwind CSS** - For responsive, modern styling
- **Web3 Integration** - For wallet connectivity and blockchain interactions

### Smart Contracts
- **Foundry** - For smart contract development and testing
- **Hardhat** - For deployment and additional testing
- **Solidity** - Smart contract language

### Backend Services
- **AI Integration** - Machine learning models for market predictions
- **BlockDAG Technology** - For secure, scalable blockchain operations

## 📊 Core Features

1. **AI-Powered Predictions**
   - Leverage machine learning to provide market insights
   - Access historical data analysis

2. **Secure Betting Platform**
   - BlockDAG technology ensures transparent and tamper-proof betting records
   - Smart contracts for automatic settlement of bets

3. **User Dashboard**
   - Track personal prediction history
   - Monitor current bets and potential returns

4. **Leaderboard System**
   - Compete with other predictors
   - Earn reputation based on prediction accuracy

5. **Wallet Integration**
   - Connect various cryptocurrency wallets
   - Seamless deposit and withdrawal process

## 🌍 About the Project

BetDAG is an innovative AI-powered prediction market platform built on BlockDAG technology that allows users to make and bet on cryptocurrency price predictions. This project was created for the BlockDAG Hackathon with the theme "Prediction Markets".

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Git
- Yarn or npm

### Installation

1. Clone the repository
```bash
git clone https://github.com/freddyfavour/BetDAG.git
cd BetDAG
```

2. Install frontend dependencies
```bash
cd frontend
npm install
```

3. Install smart contract dependencies
```bash
# For Foundry
cd contracts/foundry
forge install

# For Hardhat
cd contracts/hardhat
npm install
```

4. Start the development server
```bash
cd frontend
npm run dev
```

## 📝 Project Structure

```
BetDAG/
├── contracts/
│   ├── foundry/      # Foundry smart contracts
│   └── hardhat/      # Hardhat implementation
├── frontend/
│   ├── public/       # Static assets
│   ├── src/          # Frontend source code
│   │   ├── app/      # Next.js app router
│   │   ├── components/
│   │   ├── services/ # API services
│   │   └── context/  # React context providers
│   └── ...
└── README.md
```

## 🔮 Future Roadmap

- **Multiple Cryptocurrency Support**: Expand beyond current offerings
- **Advanced AI Models**: Enhanced prediction accuracy
- **Mobile Application**: iOS and Android support
- **Social Features**: Community discussions and shared predictions
- **Extended Market Types**: Add more types of prediction markets

## 🏆 BlockDAG Hackathon

This project was developed for the BlockDAG Hackathon, focusing on creating an innovative prediction market platform that leverages the unique features of BlockDAG technology for enhanced security, transparency, and scalability.

## 📄 License

[MIT License](LICENSE)

## 👥 Contact

For questions or feedback about BetDAG, please open an issue in this repository or contact the project maintainers directly.

---

*BetDAG - Predict the market. Powered by AI. Secured by BlockDAG*
