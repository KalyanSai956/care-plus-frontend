import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function RevenueChart({ trend }) {
  const data = {
    labels: trend.map(
      (item) => item.month
    ),

    datasets: [
      {
        label: "Revenue (₹)",
        data: trend.map(
          (item) => item.revenue
        ),

        borderColor:
          "rgb(37, 99, 235)",

        backgroundColor:
          "rgba(37, 99, 235, 0.2)",

        borderWidth: 3,

      pointRadius: 7,
pointHoverRadius: 10,
pointBackgroundColor: "#2563eb",
pointBorderColor: "#ffffff",
pointBorderWidth: 3,

        tension: 0.4,

        fill: true,
      },
    ],
  };

  const options = {
  responsive: true,

  maintainAspectRatio: false,

  plugins: {
    legend: {
      position: "top",

      labels: {
        font: {
          size: 14,
          weight: "bold",
        },
      },
    },

    tooltip: {
      backgroundColor: "#1e3a8a",
      padding: 12,
      cornerRadius: 10,
    },
  },

  scales: {
    x: {
      grid: {
        display: false,
      },

      ticks: {
        color: "#475569",
      },
    },

    y: {
      beginAtZero: true,

      grid: {
        color: "#e2e8f0",
      },

      ticks: {
        color: "#475569",
      },
    },
  },
};

  return (
  <div className="h-[350px] md:h-[400px]">
  <Line data={data} options={options}/>
</div>
    
  );
}

export default RevenueChart;