import { useEffect, useState } from "react";
import API from "../api/axios";
import StatsCard from "../components/StatsCard";
import RevenueChart from "../components/RevenueChart";
import TopSellingMedicines from "../components/TopSellingMedicines";
import AlertsCard from "../components/AlertsCard";
import TopSellingChart
from "../components/TopSellingChart";
import NotificationCard from "../components/NotificationCard";
import Layout from "../components/Layout";

function Analytics() {
  const [stats, setStats] = useState({});
  const [trend, setTrend] = useState([]);
  const [topMedicines, setTopMedicines] =
    useState([]);
  const [lowStock, setLowStock] =
    useState([]);
  const [expiring, setExpiring] =
    useState([]);

  useEffect(() => {
    fetchData();
     sendExpiryAlert();
  }, []);

  const fetchData = async () => {
    try {
      const statsRes =
        await API.get(
          "/dashboard/stats"
        );

      const trendRes =
        await API.get(
          "/dashboard/revenue-trend"
        );

      const topRes =
        await API.get(
          "/dashboard/top-selling"
        );

      const lowRes =
        await API.get(
          "/dashboard/low-stock"
        );

      const expRes =
        await API.get(
          "/dashboard/expiring"
        );

      setStats(
        statsRes.data.stats
      );

      setTrend(
        trendRes.data.trend
      );

      setTopMedicines(
        topRes.data.medicines
      );

      setLowStock(
        lowRes.data.medicines
      );

      setExpiring(
        expRes.data.medicines
      );
    } catch (error) {
      console.error(error);
    }
  };
const sendExpiryAlert =
  async () => {
    try {
      await API.get(
        "/medicines/check-expiry-alerts"
      );
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Layout>
  <div className="p-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">

  <button
  onClick={() => {
    console.log("Button Clicked");
    sendExpiryAlert();
  }}
className="mb-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-5 py-3 rounded-xl shadow-lg hover:scale-105 transition"
>
  Send Expiry Report
</button>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

  <StatsCard
  title="Today's Revenue"
  value={`₹${stats.todayRevenue || 0}`}
/>

<StatsCard
  title="Monthly Revenue"
  value={`₹${stats.monthlyRevenue || 0}`}
/>

<StatsCard
  title="Inventory Value"
  value={`₹${stats.inventoryValue || 0}`}
/>

<StatsCard
  title="Out Of Stock"
  value={stats.outOfStock || 0}
/>
      </div>

      <div className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border-2 border-blue-100 p-6 mt-8">
        <RevenueChart trend={trend} />
      </div>
  <div className="grid md:grid-cols-2 gap-6 mt-8">

  <div className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-xl border-2 border-blue-100 p-6">

    <h2 className="text-xl font-bold text-indigo-700 mb-4">
       Low Stock Medicines
    </h2>

    <p className="text-4xl font-bold text-indigo-700">
      {lowStock.length}
    </p>


  </div>

  <div className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-xl border-2 border-blue-100 p-6">

    <h2 className="text-xl font-bold text-indigo-700 mb-4">
      Expiring Soon
    </h2>

    <p className="text-4xl font-bold text-indigo-700">
      {expiring.length}
    </p>

  </div>

</div>
<div className="mt-8">

  <TopSellingChart
  medicines={topMedicines}
/>
</div>


      <div className="grid md:grid-cols-2 gap-8 mt-8">

        <AlertsCard
          title="Low Stock"
          medicines={lowStock}
        />

        <AlertsCard
          title="Expiring Soon"
          medicines={expiring}
        />

      </div>

    </div>
    </Layout>
  );
}

export default Analytics;