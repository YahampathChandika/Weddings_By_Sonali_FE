import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

export default function OverviewLineChart() {
  const [series] = useState([
    {
      name: "Patient In", 
      data: [3,0,1,2,0,3,2],
    },
    {
      name: 'Patient Out', 
      data: [1,3,0,4,2,3,4]
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
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
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
          type="line"
          height={200} 
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}
