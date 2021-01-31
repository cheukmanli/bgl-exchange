import React, { useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Paper } from "@material-ui/core";
import axios from "axios";
import dayjs from "dayjs";
import { AVAILABLE_CURRENCIES } from "../constants/currencies";
import LineGraph from "../components/LineGraph";

const API_KEY = "e50eb1e83771163bc12139d19c1bfe6e";
//const baseURL = "http://api.coinlayer.com/timeframe";

const baseURL = "https://api.exchangerate.host/timeseries";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      marginLeft: 40,
      marginTop: 20,
      minWidth: "60%",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

const getStartDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - 365);
  return date;
};

const formatDate = (date: Date) => {
  return dayjs(date).format("YYYY-MM-DD");
};

export default function HistoricPrice() {
  const classes = useStyles();
  const [currency, setCurrency] = React.useState("");

  // let historicalData;

  // const fetchHistorical = async () => {
  //   const response = await axios.get(baseURL, {
  //     params: {
  //       start_date: formatDate(getStartDate()),
  //       end_date: formatDate(new Date()),
  //       base: "BTC",
  //       symbols: currency,
  //     },
  //   });
  //   historicalData = response.data.rates;
  //   console.log(historicalData);
  // };

  // useEffect(() => {
  //   if (currency !== "") {
  //     console.log("selected:", currency);
  //     //fetchHistorical();
  //   }
  // });

  const handleChange = async (event: React.ChangeEvent<{ value: unknown }>) => {
    setCurrency(event.target.value as string);
  };

  return (
    <Paper>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="currency-select-label">Currency</InputLabel>
        <Select
          labelId="currency-select-label"
          id="currency-select"
          value={currency}
          onChange={handleChange}
          label="Currency"
        >
          {/*           <MenuItem value="">
            <em>None</em>
          </MenuItem> */}
          {AVAILABLE_CURRENCIES.map((currency) => (
            <MenuItem key={currency} value={currency}>
              {currency}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <LineGraph currency={currency}></LineGraph>
    </Paper>
  );
}
