import axios from "axios";

export async function geckoApiHandler(
  crypto: string,
  apiKey: string,
  currency: string = "eur"
) {
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${crypto}&x_cg_demo_api_key=${apiKey}`;

  return axios
    .get(url)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching data from CoinGecko:", error);
      throw error;
    });
}
