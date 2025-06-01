import { useEffect, useState, useMemo } from "react";
import Chart from "react-apexcharts";

const PieChart = ({ data }) => {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    if (data) {
      setSeries([data.deliveredCount, data.dineInCount, data.takeAwayCount]);
    }
  }, [data]);

  const options = useMemo(() => ({
    chart: {
      height: "320",
      width: "100%",
      type: "donut",
    },
    stroke: {
      colors: ["white"],
      lineCap: "2200",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "60%",
          labels: {
            show: false,
            name: {
              show: false,
            },
            value: {
              show: false,
            },
            total: {
              show: false,
            },
          },
        },
      },
    },
    labels: [
      //show upto to one decimal place
      `Served &nbsp &nbsp &nbsp &nbsp (${data?.deliveredCountPrecent?.toFixed(1) || 0}%)`,
      `Dine in &nbsp &nbsp &nbsp &nbsp (${data?.dineInCountPrecent?.toFixed(1) || 0}%)`,
      `Take Away &nbsp (${data?.takeAwayCountPrecent?.toFixed(1) || 0}%)`,
    ],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      position: "right",
      horizontalAlign: "center",
      fontSize: "11px",
      width: 260,
      height: 100,
      fontFamily: "Inter, sans-serif",
      labels: {
        colors: "#BBB9BF",
      },
      markers: {
        size: 2,
        shape: "line",
        strokeWidth: 1,
        offsetX: 120,
        customHTML: function () {
          return '<span ><i style="display: flex; position: absolute; top: 0; right: 2rem; left: 0px; width: 124px; height: 5px; border-radius: 10px; background-color: white;"><div style="width:42px; height:5px; border-radius:15px; background-color: #5B5B5B;"></div></i></span>';
        },
        colors: ["#F44336", "#E91E63", "#9C27B0"],
      },
    },
    fill: {
      colors: ["#5B5B5B", "#828282", "#2C2C2C"],
    },
  }), [data]);

  return (
    <Chart
      options={options}
      series={series}
      type="donut"
      width={380}
      height={140}
    />
  );
};

export default PieChart;