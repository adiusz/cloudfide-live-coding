"use client";

import ReactECharts from 'echarts-for-react';
import { useQuery } from "@tanstack/react-query";
import { getLatestTrades } from "@/actions";

const TransactionChart = () => {

  const { data, isLoading, error } = useQuery({
    queryKey: ["tradeData"],
    queryFn: getLatestTrades
  });

  console.log("🔥 data: ", data)

  const dataForChart= data?.map((item: { time: any; price: any; }): any => [item.time, parseFloat(item.price)]);
  console.log("👽 dataForChart: ", dataForChart)

  const options = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        // data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line',
        data: data?.map((item: { time: any; price: any; }): any => [item.time, parseFloat(item.price)]),
      }
    ],
    tooltip: {
      trigger: 'axis',
    },
  };


  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error?.message}</p>;

  return (
    <div>
      <ReactECharts option={options} />;
    </div>
  );
};

export default TransactionChart;