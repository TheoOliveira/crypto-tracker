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
        fetch("/prices/bitcoin"),
        fetch("/prices/ethereum"),
        fetch("/prices/dogecoin"),
      ]);
      //  const data = await Promise.all(
      //    responses.map((response) => response.json())
      //  );
      console.log(responses[0].json());
      setCryptoPrices({
        bitcoin: responses[0].body,
        ethereum: responses[1],
        dogecoin: responses[2],
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
