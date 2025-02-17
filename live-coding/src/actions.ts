"use server";

export const getLatestTrades = async () => {
  // GET /api/v3/trades
  // https://api.binance.com
  const res = await fetch("https://api.binance.com/api/v3/trades?symbol=ETHBTC");
  // const res = await fetch("https://api.binance.com/api/v3/ping");
  const data = await res.json();
  console.log("🔮 data: ", data)
  return data;
};