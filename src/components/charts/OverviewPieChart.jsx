import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useGetAllItemsQuery } from "../../store/api/inventoryApi";

export default function OverviewPieChart() {
  const { data: itemsData, isLoading, error } = useGetAllItemsQuery();
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      legend: {
        position: "bottom",
      },
      chart: {
        type: "donut",
      },
      labels: [],
      dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
          // Display the usedTimes value from the series instead of percentage
          const index = opts.seriesIndex;
          return opts.w.config.series[index];
        },
      },
      plotOptions: {
        pie: {
          customScale: 1.12,
          expandOnClick: false,
          donut: {
            size: "50%",
          },
        },
      },
      colors: ["#8fb935", "#EF4444", "#e6e22e", "#22a1f2", "#f4a261"], // Added more colors for 5 items
    },
  });

  useEffect(() => {
    if (itemsData && itemsData.payload) {
      // Sort items by usedTimes in descending order and take the top 5
      const sortedItems = [...itemsData.payload] // Copy the array before sorting
        .sort((a, b) => b.usedTimes - a.usedTimes)
        .slice(0, 5);

      // Extract the `usedTimes` as series data and `itemName` as labels
      const series = sortedItems.map(item => item.usedTimes);
      const labels = sortedItems.map(item => item.itemName);

      // Update chartData with the new series and labels without mutating
      setChartData(prevState => ({
        series: [...series], // Spread to create a new array
        options: {
          ...prevState.options,
          labels: [...labels], // Spread to create a new array
        },
      }));
    }
  }, [itemsData]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="donut"
          height={220}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}
