import axios from "axios";
import dayjs from "dayjs";
import { Line } from "react-chartjs-2";
import { RootStateOrAny, useSelector } from "react-redux";
import { Price } from "../store/rates/types";

interface LineGraphProps {
  currency: string;
}

//const baseURL = "http://api.coinlayer.com/timeframe";
const baseURL = "https://api.exchangerate.host/timeseries";

export default function LineGraph(props: LineGraphProps) {
  const historicPrices: Price[] = useSelector((state: RootStateOrAny) => {
    if (state.rates.currencies[props.currency]) {
      return state.rates.currencies[props.currency].historical;
    }
  });

  const getStartDate = () => {
    const date = new Date();
    date.setDate(date.getDate() - 365);
    return date;
  };

  const formatDate = (timestamp: string) => {
    return dayjs(timestamp).format("M-D HH:mm");
  };

  // const fetchHistorical = async () => {
  //   const response = await axios.get(baseURL, {
  //     params: {
  //       start_date: formatDate(getStartDate()),
  //       end_date: formatDate(new Date()),
  //       base: "BTC",
  //       symbols: props.currency,
  //     },
  //   });
  //   return response.data.rates;
  // };

  let data;
  if (props.currency && historicPrices) {
    data = {
      labels: historicPrices.map((price) => formatDate(price.timestamp)),
      datasets: [
        {
          label: "BTC" + props.currency,
          fill: false,
          lineTension: 0.5,
          backgroundColor: "rgba(75,192,192,1)",
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 2,
          data: historicPrices.map((price) => price.price),
        },
      ],
    };
  }

  return (
    <div>
      {props.currency && (
        <Line
          data={data}
          options={{
            title: "Hello",
            legend: {
              display: true,
            },
          }}
        />
      )}
    </div>
  );
}
