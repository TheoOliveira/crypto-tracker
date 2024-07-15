import { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #f0f0f0;
  font-family: "Roboto", sans-serif;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 2rem;
`;

const CryptoList = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

const CryptoCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  text-align: center;
  width: 200px;
`;

const CryptoName = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const CryptoPrice = styled.p`
  font-size: 1.2rem;
  color: #666;
`;

const CryptoAverage = styled.p`
  font-size: 1rem;
  color: #999;
  margin-bottom: 1rem;
`;

const HistoryPriceSelect = styled.select`
  font-size: 1rem;
  color: #666;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  margin-top: 1rem;
`;

function App() {
  const [cryptoPrices, setCryptoPrices] = useState<{
    bitcoin?: { latest: number; average: number; history: number[] };
    ethereum?: { latest: number; average: number; history: number[] };
    dogecoin?: { latest: number; average: number; history: number[] };
  }>({});

  useEffect(() => {
    const fetchCryptoPrices = async () => {
      const [bitcoin, ethereum, dogecoin] = await Promise.all([
        fetch("price/bitcoin").then((response) => response.json()),
        fetch("price/ethereum").then((response) => response.json()),
        fetch("price/dogecoin").then((response) => response.json()),
      ]);

      setCryptoPrices({
        bitcoin: bitcoin,
        ethereum: ethereum,
        dogecoin: dogecoin,
      });
    };

    fetchCryptoPrices();

    const interval = setInterval(fetchCryptoPrices, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <Title>Crypto Tracker</Title>
      <CryptoList>
        <CryptoCard>
          <CryptoName>BTC</CryptoName>
          <CryptoPrice>Last price: {cryptoPrices.bitcoin?.latest}</CryptoPrice>
          <CryptoAverage>
            Average price: {cryptoPrices.bitcoin?.average}
          </CryptoAverage>
          <HistoryPriceSelect>
            <option value="">Select history price</option>
            {cryptoPrices.bitcoin?.history.map((price, index) => (
              <option key={index} value={price}>
                {price}
              </option>
            ))}
          </HistoryPriceSelect>
        </CryptoCard>
        <CryptoCard>
          <CryptoName>ETH</CryptoName>
          <CryptoPrice>Last price: {cryptoPrices.ethereum?.latest}</CryptoPrice>
          <CryptoAverage>
            Average price: {cryptoPrices.ethereum?.average}
          </CryptoAverage>
          <HistoryPriceSelect>
            <option value="">Select history price</option>
            {cryptoPrices.ethereum?.history.map((price, index) => (
              <option key={index} value={price}>
                {price}
              </option>
            ))}
          </HistoryPriceSelect>
        </CryptoCard>
        <CryptoCard>
          <CryptoName>DOGE</CryptoName>
          <CryptoPrice>Last price: {cryptoPrices.dogecoin?.latest}</CryptoPrice>
          <CryptoAverage>
            Average price: {cryptoPrices.dogecoin?.average}
          </CryptoAverage>
          <HistoryPriceSelect>
            <option value="">Select history price</option>
            {cryptoPrices.dogecoin?.history.map((price, index) => (
              <option key={index} value={price}>
                {price}
              </option>
            ))}
          </HistoryPriceSelect>
        </CryptoCard>
      </CryptoList>
    </Container>
  );
}

export default App;
