import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [cryptoPrices, setCryptoPrices] = useState<{
    bitcoin?: { latest: number; average: number; history: number[] };
    ethereum?: { latest: number; average: number; history: number[] };
    dogecoin?: { latest: number; average: number; history: number[] };
  }>({});

  useEffect(() => {
    const fetchCryptoPrices = async () => {
      const responses = await Promise.all([
        fetch("price/bitcoin").then((response) => response.json()),
        fetch("price/ethereum").then((response) => response.json()),
        fetch("price/dogecoin").then((response) => response.json()),
      ]);
      const data = await Promise.all(responses);

      setCryptoPrices({
        bitcoin: data[0].body,
        ethereum: data[1].body,
        dogecoin: data[2].body,
      });
    };

    fetchCryptoPrices();

    const interval = setInterval(fetchCryptoPrices, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div>Crypto Tracker</div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span>BTC</span>
          <span>Last price: {cryptoPrices.bitcoin?.latest}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span>ETH</span>

          <span>Last price: {cryptoPrices.ethereum?.latest}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span>DOGE</span>

          <span>Last price: {cryptoPrices.dogecoin?.latest}</span>
        </div>
      </div>
    </>
  );
}

export default App;
