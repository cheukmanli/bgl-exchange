import { green, red } from "@material-ui/core/colors";
import { TrendingDown, TrendingFlat, TrendingUp } from "@material-ui/icons";
import dayjs from "dayjs";
import React from "react";
import { Currency, Price } from "../store/rates/types";

export const getMovementIcon = (movement: string) => {
  if (movement === "up") {
    return <TrendingUp style={{ color: green[500] }} />;
  } else if (movement === "down") {
    return <TrendingDown style={{ color: red[500] }} />;
  } else {
    return <TrendingFlat />;
  }
};

export const getAveragePriceByTimeRange = (
  currency: Currency,
  fromDateTime: string,
  toDateTime: string
) => {
  if (fromDateTime == "" || toDateTime == "") return "-";
  const fromTimeObj = dayjs(fromDateTime);
  const toTimeObj = dayjs(toDateTime);
  if (fromTimeObj.isAfter(toTimeObj)) return "-";
  const filtered = currency.historical.filter((price) => {
    const timestampObj = dayjs(price.timestamp);
    return (
      (timestampObj.isAfter(fromTimeObj) && timestampObj.isBefore(toTimeObj)) ||
      (timestampObj.isSame(toTimeObj, "minutes") &&
        !timestampObj.isBefore(fromDateTime))
    );
  });
  if (filtered.length == 0) return "-";
  return getAveragePrice(filtered);
};

export const getAveragePrice = (prices: Price[]): string => {
  const pricesSum = prices
    .map((price) => price.price)
    .reduce((sum, curr) => sum + curr, 0);
  return (pricesSum / prices.length).toFixed(2);
};
