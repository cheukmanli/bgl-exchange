import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import dayjs from "dayjs";
import { AVAILABLE_CURRENCIES } from "../../config/currencies";
import { RatesState } from "../rates/types";

const initialState: RatesState = {
  currencies: {},
  status: "idle",
  error: null,
};

export const fetchLatestRates = createAsyncThunk(
  "rates/fetchLatestRates",
  async () => {
    const response = await axios.get("https://blockchain.info/ticker");
    return response.data;
  }
);

export const getPriceMovement = (prevPrice: number, newPrice: number) => {
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
    builder.addCase(fetchLatestRates.rejected, (state, action) => {
      state.error = Error(action.error.message);
      state.status = "failed";
    });
  },
});

export default ratesSlice.reducer;
