import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import dayjs from "dayjs";
import { AVAILABLE_CURRENCIES } from "../../constants/currencies";
import { ExchangeRate, Price, RatesState } from "../rates/types";

const initialState: RatesState = {
  currencies: {},
  status: "idle",
  error: null,
};

export const fetchLatestRates = createAsyncThunk(
  "rates/fetchLatestRates",
  async () => {
    const response = await axios.get("https://blockchain.info/ticker");
    //const response = await axios.get("https://api.exchangerate.host/latest", {
    //   params: { base: "BTC", symbols: AVAILABLE_CURRENCIES.join(",") },
    // });
    return response.data;
  }
);

const getLatestPrice = (rates: Price[]) => {
  return rates.reduce((prev, curr) => {
    return prev.timestamp > curr.timestamp ? prev : curr;
  });
};

const getPriceMovement = (prevPrice: number, newPrice: number) => {
  if (prevPrice > newPrice) {
    return "down";
  } else if (prevPrice < newPrice) {
    return "up";
  } else {
    return null;
  }
};

const ratesSlice = createSlice({
  name: "rates",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLatestRates.fulfilled, (state, action) => {
      const fetchedRates = action.payload;
      Object.keys(fetchedRates).map((currency: any) => {
        let fetchedPrice = parseFloat(fetchedRates[currency].last);
        if (AVAILABLE_CURRENCIES.includes(currency)) {
          const priceObject = {
            price: fetchedPrice,
            timestamp: dayjs().toISOString(),
          };
          if (currency in state.currencies) {
            const prevPrice = state.currencies[currency].latest.price;
            state.currencies[currency] = {
              ...state.currencies[currency],
              movement:
                getPriceMovement(prevPrice, fetchedPrice) ||
                state.currencies[currency].movement,
              historical: [
                ...state.currencies[currency].historical,
                priceObject,
              ],
            };
          } else {
            state.currencies[currency] = {
              ...state.currencies[currency],
              historical: [priceObject],
            };
          }
          state.currencies[currency] = {
            ...state.currencies[currency],
            latest: priceObject,
          };
        }

        state.status = "succeeded";
      });
    });
  },
});

export default ratesSlice.reducer;
