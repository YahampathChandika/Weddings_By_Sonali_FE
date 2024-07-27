import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

export default function OverviewLineChart() {
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  const d = new Date();
  let month1 = month[d.getMonth()-2];
  let month2 = month[d.getMonth()-1];
  const [series] = useState([
    {
      name: month1, 
      data: [8,10,5,2],
    },
    {
      name: month2, 
      data: [4,3,9,7]
    },
  ]);

  const [options] = useState({
    chart: {
      height: 200,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
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
      categories: [
        "Week 1",
        "Week 2",
        "Week 3",
        "Week 4",
      ],
    },
    markers: {
      size: 3,
  },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'center'
    },
    // colors: ["#FF4560", "#FEB019", "#00E396"], // Custom colors

  });

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
