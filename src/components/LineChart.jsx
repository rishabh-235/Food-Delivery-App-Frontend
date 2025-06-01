import { useEffect, useState, useMemo } from "react";
import Chart from "react-apexcharts";

const LineChart = ({data}) => {

  const day = data?.map((item) => item.label) || ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const revenue = data?.map((item) => item.totalRevenue) || [4.4, 5.05, 4.14, 10, 2.27, 3.5, 4.2];

  const options = useMemo(() => ({
    options: {
      chart: {
        height: "100%",
        maxWidth: "100%",
        type: "area",
        fontFamily: "Inter, sans-serif",
        dropShadow: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      stroke: {
        curve: "smooth",
        width: [0, 2],
      },
      tooltip: {
        enabled: true,
        style: {
          fontSize: '10px',
          fontFamily: undefined
        },
        x: {
          show: false,
        },
      },
      grid: {
        show: false,
        strokeDashArray: 4,
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        type: "category",
        categories: day,
        labels: {
          style: {
            colors: "#2E2E30",
            fontSize: "10px",
            fontFamily: "Inter, sans-serif",
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: [
        {
          show: false,
        },
        {
          show: false,
        },
      ],
    },
  }), [day]);

  const [series, setSeries] = useState([
    {
      type: "column",
      data: [4.4, 5.05, 4.14, 10, 2.27, 3.5, 4.2],
      color: "#D9D9D9",

    },
    {
      type: "line",
      data: [2.3, 4.2, 3.5, 10, 4.3, 2.2, 3.8],
      color: "#2A2A2A",
      Zindex: 1,
    },
  ]);

  useEffect(()=>{
    if (data) {
      const newSeries = [
        {
          type: "column",
          data: revenue,
          color: "#D9D9D9",
        },
        {
          type: "line",
          data: revenue,
          color: "#2A2A2A",
          Zindex: 1,
        },
      ];
      setSeries(newSeries);
    }
  }, [data])

  return (
    <div className="app">
      <div className="row">
        <div style={{ boxSizing: "border-box", border: "2px solid #D9D9D9", borderRadius: "0.4rem", overflow: "hidden", backgroundColor: "#ffffff" }} className="mixed-chart">
          <Chart options={options.options} series={series} type="line" width="380" height={160} />
        </div>
      </div>
    </div>
  );
};

export default LineChart;
