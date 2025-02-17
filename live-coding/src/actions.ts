"use server";

export type TradeData = {
  id: number;
  price: string;
  qty: string;
  quoteQty: string;
  time: string;
  isBuyerMaker: boolean;
  isBestMatch: boolean;
}

export const getLatestTrades = async (): Promise<TradeData[]> => {
  const res = await fetch("https://api.binance.com/api/v3/trades?symbol=ETHBTC");
  return res.json();
};