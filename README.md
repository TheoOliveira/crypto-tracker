# Crypto Price Tracker

This is a full-stack application that tracks the prices of popular cryptocurrencies like Bitcoin, Ethereum, and Dogecoin. It consists of a backend server built with Nuxt.js (Nitro) and a frontend React application.

## Features

- Fetches real-time cryptocurrency prices from the CoinGecko API
- Displays the latest price, average price, and price history for each tracked cryptocurrency
- Frontend built with React and TypeScript, with Vite for bundling
- Backend built with Nuxt.js (Nitro) and TypeScript
- SQLite database for storing price data (optional)

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- Yarn package manager
- CoinGecko API key (free)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/crypto-tracker.git

cd crypto-tracker/backend
yarn install

cd ../frontend
yarn install

COINGECKO_API=your_api_key_here
NITRO_PORT=port_for_the_backend

cd backend
yarn dev

cd ../frontend
yarn dev
```

The frontend application will be running at http://localhost:5173.

This project is licensed under the MIT License.

