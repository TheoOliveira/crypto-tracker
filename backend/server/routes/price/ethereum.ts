import { getPriceData } from "~~/utils/priceTracker";

export default defineEventHandler(async (event) => {
  const minutes = getRouterParam(event, "minutes");
  const priceData = getPriceData("ethereum", Number(minutes));
  return priceData;
});
