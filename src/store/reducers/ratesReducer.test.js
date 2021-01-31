import { getPriceMovement } from "./ratesReducer";
import axios from "axios";

describe("Test RateReducer", () => {
  let response;
  beforeAll(async () => {
    response = await axios.get("https://blockchain.info/ticker");
  });
  it("fetches a valid response", () => {
    expect(response).toBeDefined();
  });
  it("fetches a 200 success code", () => {
    expect(response.status).toBe(200);
  });
  it("fetches exchange rates for USD", () => {
    expect(response.data).toHaveProperty("USD");
  });
  it("fetches price for USD as 'last'", () => {
    expect(response.data["USD"]).toHaveProperty("last");
    expect(response.data["USD"].last).toBeGreaterThan(0);
  });
});

describe("Test getPriceMovement", () => {
  it("returns 'up' if new price is greater", () => {
    expect(getPriceMovement(10, 100)).toBe("up");
  });
  it("returns 'down' if new price is smaller", () => {
    expect(getPriceMovement(100, 10)).toBe("down");
  });
  it("returns null if new price is the same as old price", () => {
    expect(getPriceMovement(100, 100)).toBe(null);
  });
});
