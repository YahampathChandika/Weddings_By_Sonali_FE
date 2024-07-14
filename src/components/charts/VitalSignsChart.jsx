import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetPatientVitalsIdQuery } from "../../store/api/patientApi";
import ReactApexChart from "react-apexcharts";
import moment from "moment";

export default function VitalSignsChart({ startDate, endDate }) {
  const { id } = useParams();
  const { data: vitalData, isLoading, error } = useGetPatientVitalsIdQuery(id);

  const vitalSigns = [
    { name: "heartRate", color: "#5A81FA", title: "Heart Rate" },
    { name: "respiratoryRate", color: "#5A81FA", title: "Respiratory Rate" },
    { name: "supplementedO2", color: "#5A81FA", title: "Supplemented O2" },
    { name: "O2saturation", color: "#5A81FA", title: "O2 Saturation" },
    { name: "temperature", color: "#5A81FA", title: "Temperature" },
    { name: "systolicBP", color: "#5A81FA", title: "Systolic BP" },
    { name: "diastolicBP", color: "#5A81FA", title: "Diastolic BP" },
  ];

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (vitalData?.payload) {
      const newChartData = vitalSigns.map((sign) => {
        const filteredData = vitalData.payload
          .map((data) => ({
            date: data.date,
            time: data.time,
            value: data[sign.name],
          }))
          .filter((entry) => {
            const entryDate = moment(`${entry.date} ${entry.time}`, "YYYY-MM-DD HH:mm");
            const isInDateRange = startDate && endDate ? entryDate.isBetween(startDate, endDate, 'day', '[]') : true;
            return entry.value !== null && isInDateRange;
          });

        return {
          name: sign.name,
          color: sign.color,
          series: [
            {
              name: sign.name,
              data: filteredData.map((entry) => ({
                x: `${entry.date} ${entry.time}`,
                y: entry.value,
              })),
            },
          ],
          options: {
            chart: {
              height: 200,
              type: "line",
              zoom: {
                enabled: true,
              },
              toolbar: {
                show: true,
                export: {
                  csv: {
                    filename: `${sign.title.replace(/\s/g, '_')}_data`,
                    columnDelimiter: ",",
                    headerCategory: "Date",
                    headerValue: sign.title,
                    dateFormatter(timestamp) {
                      return new Date(timestamp).toLocaleString();
                    },
                    data: {
                      columns: ["Date", "Time", "Value"],
                      csv: () => {
                        return filteredData.map((entry) => [
                          entry.date,
                          entry.time,
                          entry.value,
                        ]);
                      },
                    },
                  },
                },
              },
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              curve: "straight",
            },
            title: {
              text: sign.title,
              align: "left",
              style: {
                fontSize: "17px",
                fontFamily: "Poppins",
                fontWeight: "600",
              },
            },
            colors: [sign.color],
            grid: {
              row: {
                colors: ["#f3f3f3", "transparent"],
                opacity: 0.5,
              },
            },
            xaxis: {
              type: 'datetime',
              categories: filteredData.map((entry) => `${entry.date} ${entry.time}`),
            },
            markers: {
              size: 3,
            },
            legend: {
              show: true,
              position: "top",
              horizontalAlign: "center",
            },
          },
        };
      });
      setChartData(newChartData);
    }
  }, [vitalData, startDate, endDate]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="grid grid-cols-2 gap-8">
      {chartData.map((chart, index) => (
        <div
          key={index}
          className="flex-col w-full bg-white rounded-md justify-between items-center px-5 py-3"
        >
          <ReactApexChart
            options={chart.options}
            series={chart.series}
            type="line"
            height={300}
          />
        </div>
      ))}
    </div>
  );
}
