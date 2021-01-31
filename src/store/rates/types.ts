export interface Price {
  price: number;
  timestamp: string;
}

export interface Currency {
  historical: Price[];
  latest: Price;
  movement: "up" | "down" | "none";
}

export interface ExchangeRate {
  [currency: string]: Currency;
}

export interface RatesState {
  currencies: ExchangeRate;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: Error | null;
}
