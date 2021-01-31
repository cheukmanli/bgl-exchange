import { configureStore } from "@reduxjs/toolkit";
import ratesReducer from "./reducers/ratesReducer";

const store = configureStore({
  reducer: { rates: ratesReducer },
});

export default store;
