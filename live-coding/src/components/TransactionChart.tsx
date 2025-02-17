"use client";

import ReactECharts from "echarts-for-react";
import { useQuery } from "@tanstack/react-query";
import { getLatestTrades, TradeData } from "@/actions";
import { useEffect, useState } from "react";

const TransactionChart = () => {

  const { data, refetch, isLoading, error } = useQuery({
    queryKey: ["tradeData"],
    queryFn: getLatestTrades
  });

  const [chartData, setChartData] = useState<TradeData[] | []>([]);
  const [chartOptions, setChartOptions] = useState<{}>({});

  console.log("🐮 chartData: ", chartData)

  useEffect(() => {
    if (data) {
      setChartData(data);
      setChartOptions({
        title: {
          left: 'center',
          text: 'BTH-ETH price'
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 20
          },
          {
            start: 0,
            end: 20
          }
        ],
        tooltip: {
          trigger: 'axis',
          position: function (pt: any) {
            return [pt[0], '10%'];
          }
        },
        xAxis: {
          type: "category",
          data: data?.map((item: { time: string | number | Date; }) => new Date(item.time).toLocaleTimeString("en-US")),
        },
        yAxis: {
          type: "value",
          name: "Price",
          min: Math.min(...chartData.map(item => parseFloat(item.price))),
        },
        series: [
          {
            type: "bar",
            smooth: true,
            data: data?.map((item: { time: any; price: any; }): any => parseFloat(item.price))
          }
        ],
      })
    }
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>There was an issue with getting the price data. Please try again later or contact the admin.</p>;


  return (
    <div className="mt-10">
      <ReactECharts option={chartOptions} />

      <button onClick={() => refetch()}>Refetch</button>
    </div>
  );
};

export default TransactionChart;