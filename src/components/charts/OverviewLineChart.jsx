import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import moment from "moment";
import { useGetOrdersByStateQuery } from "../../store/api/orderApi";

export default function OverviewBarChart() {
  const { data: ordersData, error, isLoading } = useGetOrdersByStateQuery(4);
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({
    chart: {
      height: 200,
      type: "bar",
      zoom: {
        enabled: true,
      },
      toolbar: {
        show: true,
      },
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "straight",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [],
    },

    markers: {
      size: 3,
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "center",
    },
  });

  useEffect(() => {
    if (ordersData && !isLoading && !error) {
      // Initialize the data for the past 8 weeks
      const currentDate = moment();
      const weeks = [];
      for (let i = 7; i >= 0; i--) {
        weeks.push(currentDate.clone().subtract(i, "weeks").format("MMM-DD"));
      }
      const weeklyData = new Array(weeks.length).fill(0);

      ordersData.payload.forEach((order) => {
        const orderWeek = moment(order.createdAt).format("MMM-DD");
        const index = weeks.indexOf(orderWeek);
        if (index !== -1) {
          weeklyData[index] += 1;
        } else {
          weeks.push(orderWeek);
          weeklyData.push(1);
        }
      });

      setOptions((prevOptions) => ({
        ...prevOptions,
        xaxis: {
          ...prevOptions.xaxis,
          categories: weeks,
        },
      }));

      setSeries([{ data: weeklyData }]);
    }
  }, [ordersData, isLoading, error]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="w-full h-1/2 items-center flex justify-center">No Data To Display!</div>;

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={200}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}
