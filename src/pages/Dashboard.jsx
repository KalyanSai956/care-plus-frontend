import { useEffect, useState } from "react";
import API from "../api/axios";
import Sidebar from "../components/Sidebar";
import StatsCard from "../components/StatsCard";
import RevenueChart from "../components/RevenueChart";
import TopSellingMedicines from "../components/TopSellingMedicines";
import AlertsCard from "../components/AlertsCard";
import Navbar from "../components/Navbar";
import Chatbot from "../components/Chatbot";
import Layout from "../components/Layout";

function Dashboard() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [stats, setStats] = useState({
    totalMedicines: 0,
    lowStock: 0,
    totalInvoices: 0,
    totalRevenue: 0,
  });

  const [trend, setTrend] = useState([]);
  const [lowStock, setLowStock] =
  useState([]);

const [expiring, setExpiring] =
  useState([]);

  useEffect(() => {
    fetchStats();
    fetchTrend();
      fetchTopMedicines();
      fetchAlerts();
  }, []);
const [topMedicines,
  setTopMedicines] =
  useState([]);
  const fetchStats = async () => {
    try {
      const response = await API.get(
        "/dashboard/stats"
      );

      console.log(
        "Dashboard Stats:",
        response.data
      );

      setStats(response.data.stats);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTrend = async () => {
    try {
      const response = await API.get(
        "/dashboard/revenue-trend"
      );

      console.log(
        "Revenue Trend:",
        response.data
      );

      setTrend(response.data.trend);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTopMedicines =
  async () => {
    try {
      const response =
        await API.get(
          "/dashboard/top-selling"
        );

      setTopMedicines(
        response.data.medicines
      );
    } catch (error) {
      console.error(error);
    }
  };
  const fetchAlerts = async () => {
  try {
    const low = await API.get(
      "/dashboard/low-stock"
    );

    const exp = await API.get(
      "/dashboard/expiring"
    );

    setLowStock(
      low.data.medicines || []
    );

    setExpiring(
      exp.data.medicines || []
    );
  } catch (error) {
    console.error(
      "Alerts Error:",
      error
    );
  }
};
  return (
  <Layout>

    <div className="w-full overflow-hidden">

      <h1 className="text-2xl md:text-3xl font-bold mb-5 text-indigo-600">
        Welcome, {user?.name} 
      </h1>


    <div className="hidden lg:block">
  </div>


        {/* Stats Cards */}
       <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          <StatsCard
            title="Total Medicines"
            value={stats.totalMedicines}
          />

          <StatsCard
            title="Low Stock"
            value={stats.lowStock}
          />

          <StatsCard
            title="Invoices"
            value={stats.totalInvoices || 0}
          />

          <StatsCard
            title="Revenue"
            value={`₹${stats.totalRevenue || 0}`}
          />
        </div>

        {/* Revenue Chart */}
  <div className="bg-white/80 backdrop-blur-xl border border-blue-100 rounded-3xl shadow-xl p-4 md:p-8 mt-8 overflow-x-auto">
   <h2 className="text-2xl font-bold text-indigo-900 mb-4">
  Revenue Overview
</h2>
  <RevenueChart trend={trend} />
</div>
<div className="grid md:grid-cols-2 gap-6 mt-8">

  <AlertsCard
    title=" Low Stock Medicines"
    medicines={lowStock}
  />

  <AlertsCard
    title=" Expiring Medicines"
    medicines={expiring}
  />

</div>
<div className="mt-8">
  <TopSellingMedicines
    medicines={topMedicines}
  />
</div>
</div>
</Layout>
  );
  
}

export default Dashboard;