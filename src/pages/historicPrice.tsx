import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Paper } from "@material-ui/core";
import { AVAILABLE_CURRENCIES } from "../config/currencies";
import LineGraph from "../components/LineGraph";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      marginLeft: 40,
      marginTop: 20,
      marginBottom: 30,
      minWidth: "60%",
    },
  })
);

export default function HistoricPrice() {
  const classes = useStyles();
  const [currency, setCurrency] = React.useState("");

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
