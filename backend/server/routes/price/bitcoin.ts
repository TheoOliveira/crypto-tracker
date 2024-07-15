import { getPriceData } from "~~/utils/priceTracker";

export default defineEventHandler(async (event) => {
  const minutes = getRouterParam(event, "minutes");
  const priceData = getPriceData("bitcoin", Number(minutes));
  return priceData;
});
