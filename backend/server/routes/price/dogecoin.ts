import { getPriceData } from "~~/utils/priceTracker";

export default defineEventHandler(async (event) => {
  const minutes = getRouterParam(event, "minutes");
  const priceData = getPriceData("dogecoin", Number(minutes));
  return priceData;
});
