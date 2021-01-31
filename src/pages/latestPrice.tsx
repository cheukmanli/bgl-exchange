import React, { useEffect } from "react";
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
import { getMovementIcon } from "../utilities/utilities";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function LatestPrice() {
  const classes = useStyles();
  const dispatch = useDispatch();

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

  return (
    <>
      {ratesStatus === "succeeded" && (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Currency</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Movement</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(currencies).map((currency) => (
                <TableRow key={currency}>
                  <TableCell component="th" scope="row" align="center">
                    BTC{currency}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {currencies[currency].latest.price.toFixed(2)}
                  </TableCell>
                  <TableCell scope="row" align="center">
                    {getMovementIcon(currencies[currency].movement)}
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
