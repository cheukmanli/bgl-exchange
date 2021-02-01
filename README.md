# BGL Exchange Rates

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Usage

https://bgl-exchange-rates.herokuapp.com/

- All exchange rates are fetched using the API https://blockchain.info/ticker, once every minute
- All page views will be updated corresponding to newly fetched exchange rates

### Tabs:

1. ##### Latest Price

- Displays a list of exchange rates (from "BTC")
- Movements:
  - Increase: Green upwards arrow
  - Decrease: Red downwards arrow
  - No change: Black rightwards arrow (should only occur on initialization)

2. ##### Historic Price

- Select currency in dropdown to display a line graph of its historical data
- ** Data is directly taken from the historic data of the state, so it may take a few minutes for the graph to be populated

3. ##### Average Price

- Select time range in "From:" and "To:" date time-picker
- "From" date time must not be greater than "To" date time

## Design Decisions

1. #### Technology used:

- React
- Typescript: Enable type-checking
- Create-react-app: Handling of setup, boilerplate and bundling
- Redux Toolkits: Enable state management and integration of AsyncThunk
- Jest: Enable easy testing

2. #### Client objects:

   1. `Price: {price: number, timestamp: string}`
   2. `Currency: {historical: Price[], latest: Price, movement: "up" | "down" | none}`
      - `latest` Allows easy access to the current price for calculation of price movements
      - `historical` Stores historical data of a specific currency 
      - **(With a proper backend server, it should be populated with complete data)**
   3. `ExchangeRate: {[currency: string]: Currency}` An object that allows easy access to difference `Currencies` by key