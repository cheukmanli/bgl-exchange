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
  })
);

export default function HistoricPrice() {
  const classes = useStyles();
  const [currency, setCurrency] = React.useState("");

  // const fetchHistorical = async () => {
  //   const response = await axios.get(baseURL, {
  //     params: {
  //       start_date: formatDate(getStartDate()),
  //       end_date: formatDate(new Date()),
  //       base: "BTC",
  //       symbols: currency,
  //     },
  //   });
  // };

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
