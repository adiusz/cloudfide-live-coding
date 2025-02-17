"use client";

import ReactECharts from "echarts-for-react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getLatestTrades, TradeData } from "@/actions";
import { useEffect, useState } from "react";

const TransactionChart = () => {

  const { data, refetch, isLoading, isRefetching, error }: UseQueryResult<TradeData[], Error>  = useQuery({
    queryKey: ["tradeData"],
    queryFn: getLatestTrades
  });

  const [chartOptions, setChartOptions] = useState<{}>({});

  useEffect(() => {
    if (data) {
      setChartOptions({
        title: {
          left: "center",
          text: "BTH-ETH price"
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: "none"
            },
            restore: {},
            saveAsImage: {}
          }
        },
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 20
          },
          {
            start: 0,
            end: 20
          }
        ],
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          data: data?.map((item: { time: string | number | Date; }) => new Date(item.time).toLocaleTimeString("en-US"))
        },
        yAxis: {
          type: "value",
          name: "Price",
          min: Math.min(...data?.map(item => parseFloat(item.price)))
        },
        series: [
          {
            type: "bar",
            smooth: true,
            data: data?.map((item: { time: any; price: any; }): any => parseFloat(item.price))
          }
        ]
      });
    }
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>There was an issue with getting the price data. Please try again later or contact the admin.</p>;

  return (
    <div className="mt-10">
      <ReactECharts option={chartOptions} />
      <div className="flex justify-center mt-10">
        <button className="bg-white text-black rounded-xl p-2 w-[150px]" onClick={() => refetch()}>
          {isRefetching ? "Updating..." : "Update data"}
        </button>
      </div>
    </div>
  );
};

export default TransactionChart;