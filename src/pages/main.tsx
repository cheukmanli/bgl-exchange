import React, { useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import LatestPrice from "./latestPrice";
import AveragePrice from "./averagePrice";
import HistoricPrice from "./historicPrice";
import { fetchLatestRates } from "../store/reducers/ratesReducer";
import { useDispatch } from "react-redux";
import LinkTab from "../components/LinkTab";
import TabPanel from "../components/TabPanel";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function MainPage() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchLatestRates());
    }, 1000 * 60);
    return () => clearInterval(interval);
  }, [dispatch]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs variant="fullWidth" value={value} onChange={handleChange}>
          <LinkTab label="Latest Price" href="/prices" />
          <LinkTab label="Historic price" href="/historic" />
          <LinkTab label="Average price" href="/average" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <LatestPrice />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <HistoricPrice />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AveragePrice />
      </TabPanel>
    </div>
  );
}
