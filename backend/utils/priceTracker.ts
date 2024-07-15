import { geckoApiHandler } from "./geckoApiHandler";

const apiKey = process.env.COINGECKO_API;
const cryptos = ["bitcoin", "ethereum", "dogecoin"];
const priceHistory: { [symbol: string]: number[] } = {};

export async function fetchPrices() {
  cryptos.forEach((crypto) => {
    geckoApiHandler(crypto, apiKey, "eur")
      .then((data) => {
        if (data.length > 0) {
          const price = data[0].current_price;
          priceHistory[crypto] = [...(priceHistory[crypto] || []), price];
        } else {
          console.log(`No data found for ${crypto}`);
        }
      })
      .catch((error) => {
        console.error(`Error fetching ${crypto} price:`, error);
      });
  });
}

function getPriceData(symbol: string, minutes: number = 60) {
  const history = priceHistory[symbol] || [];
  const count = history.length;
  const latest = history[count - 1] || 0;
  const average = history.reduce((sum, price) => sum + price, 0) / count || 0;
  const requestedHistory = history.slice(-minutes);

  return {
    latest,
    average,
    history: requestedHistory,
    count: requestedHistory.length,
  };
}

// Fetch prices initially
fetchPrices();

// Fetch prices every 60 seconds
setInterval(fetchPrices, 60000);

export { getPriceData };
