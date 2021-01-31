import React, { useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { ExchangeRate } from "../store/rates/types";
import { fetchLatestRates } from "../store/reducers/ratesReducer";
import DateAndTimePickers from "../components/DateTimePicker";
import { Grid } from "@material-ui/core";
import { getAveragePriceByTimeRange } from "../utilities/utilities";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  input: {
    marginBottom: 40,
  },
});

export default function AveragePrice() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [fromDateTime, setFromDateTime] = useState("");
  const [toDateTime, setToDateTime] = useState("");

  const currencies: ExchangeRate = useSelector(
    (state: RootStateOrAny) => state.rates.currencies
  );
  const ratesStatus = useSelector(
    (state: RootStateOrAny) => state.rates.status
  );

  useEffect(() => {
    if (ratesStatus === "idle") {
      dispatch(fetchLatestRates());
    }
  }, [ratesStatus, dispatch]);

  useEffect(() => {
    if (toDateTime !== "" && toDateTime !== "" && toDateTime < fromDateTime) {
      alert("'From' time must not be greater than 'To' time!");
    }
  }, [fromDateTime, toDateTime]);

  return (
    <>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        className={classes.input}
      >
        {" "}
        <DateAndTimePickers
          title="From:"
          handleOnChangeValue={(e) => setFromDateTime(e.target.value)}
        />
        <DateAndTimePickers
          title="To:"
          handleOnChangeValue={(e) => setToDateTime(e.target.value)}
        />
      </Grid>
      {ratesStatus === "succeeded" && (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Currency</TableCell>
                <TableCell align="center">Average Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(currencies).map((currency) => (
                <TableRow key={currency}>
                  <TableCell component="th" scope="row" align="center">
                    BTC{currency}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {getAveragePriceByTimeRange(
                      currencies[currency],
                      fromDateTime,
                      toDateTime
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
