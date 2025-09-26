import { useEffect, useState } from "react";
import StatsCard from "./StatsCard";
import customersIcon from "../../assets/img_navbar/group.png";
import foodIcon from "../../assets/img_navbar/dish.png";
import orderIcon from "../../assets/img_navbar/order-delivery.png";
import RecentOrder from "./RecentOrder";
import { fetchDashboardStats } from "../../api/orderApi";

export default function DashBoard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    pendingOrders: 0,
    completedOrders: 0,
    cancelledOrders: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        setLoading(true);
        const data = await fetchDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Error loading:", error);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  const statsCards = [
    { 
      icon: customersIcon, 
      value: loading ? "..." : stats.totalCustomers.toString(), 
      title: "CUSTOMERS" 
    },
    { 
      icon: orderIcon, 
      value: loading ? "..." : stats.totalOrders.toString(), 
      title: "ORDERS" 
    },
    { 
      icon: orderIcon, 
      value: loading ? "..." : stats.completedOrders.toString(), 
      title: "COMPLETED" 
    },
    { 
      icon: foodIcon, 
      value: loading ? "..." : `$${(stats.totalRevenue || 0).toFixed(2)}`, 
      title: "REVENUE" 
    },
  ];

  return (
    <section className="bg-gray-100 space-y-6">
      <div className="grid grid-cols-4 gap-6">
        {statsCards.map((card, index) => (
          <StatsCard
            key={index}
            icon={card.icon}
            value={card.value}
            title={card.title}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Status Breakdown</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Pending Orders:</span>
              <span className="font-medium text-orange-600">
                {loading ? "..." : stats.pendingOrders}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Completed Orders:</span>
              <span className="font-medium text-green-600">
                {loading ? "..." : stats.completedOrders}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Cancelled Orders:</span>
              <span className="font-medium text-red-600">
                {loading ? "..." : stats.cancelledOrders}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue Overview</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              ${loading ? "..." : (stats.totalRevenue || 0).toFixed(2)}
            </div>
            <p className="text-gray-500 text-sm mt-2">Total Revenue from Completed Orders</p>
          </div>
        </div>
      </div>

      <RecentOrder />
    </section>
  );
}
