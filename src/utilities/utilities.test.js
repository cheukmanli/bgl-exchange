import dayjs from "dayjs";
import { getAveragePrice, getAveragePriceByTimeRange } from "./utilities";

describe("Test getAveragePrice", () => {
  it("Returns average prices rounded to 2 d.p.", () => {
    const prices = [
      { price: 10, timestamp: dayjs().toISOString() },
      { price: 10, timestamp: dayjs().toISOString() },
    ];
    expect(getAveragePrice(prices)).toBe("10.00");
  });
});

describe("Test getAveragePriceByTimeRange", () => {
  const prices = [
    { price: 10, timestamp: dayjs().toISOString() },
    { price: 10, timestamp: dayjs().toISOString() },
  ];
  let fromDateTime = dayjs().toISOString();
  let toDateTime = dayjs().toISOString();
  it("Returns '-' if input time is empty", () => {
    expect(getAveragePriceByTimeRange(prices, "", toDateTime)).toBe("-");
    expect(getAveragePriceByTimeRange(prices, fromDateTime, "")).toBe("-");
  });
  it("Returns '-' if fromDateTime is after toDateTime", () => {
    fromDateTime = dayjs().add(1, "month");
    expect(getAveragePriceByTimeRange(prices, fromDateTime, toDateTime)).toBe(
      "-"
    );
  });
});
