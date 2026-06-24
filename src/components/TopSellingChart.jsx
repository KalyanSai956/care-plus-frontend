import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function TopSellingChart({
  medicines,
}) {
  const data = {
    labels: medicines.map(
      (item) => item.medicine
    ),

    datasets: [
      {
        label:
          "Quantity Sold",

        data: medicines.map(
          (item) =>
            item.quantitySold
        ),

        backgroundColor:
          "#2563eb",
      },
    ],
  };

return (
  <div className="bg-white rounded-3xl shadow-xl border border-blue-100 p-4 md:p-6">

    <h2 className="text-xl md:text-2xl font-bold text-indigo-700 mb-4">
      Top Selling Medicines
    </h2>

    <div className="h-64 md:h-96">

      <Bar
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,

          plugins: {
            legend: {
              position: "top",
            },
          },

          scales: {
            x: {
              ticks: {
                font: {
                  size: 10,
                },
              },
            },

            y: {
              beginAtZero: true,
            },
          },
        }}
      />

    </div>

  </div>
);
}

export default TopSellingChart;