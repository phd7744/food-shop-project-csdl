import { useEffect, useState } from "react";
import { fetchRecentOrders } from "../../api/dashboardApi";
import { Link } from "react-router-dom";

export default function RecentOrder() {
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRecentOrders() {
      try {
        setLoading(true);
        const data = await fetchRecentOrders(8); 
        setRecentOrders(data);
      } catch (error) {
        console.error("Error loading:", error);
      } finally {
        setLoading(false);
      }
    }

    loadRecentOrders();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'pending':
        return 'text-orange-600';
      case 'confirmed':
        return 'text-blue-600';
      case 'cancelled':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
        <Link 
          to="/orders" 
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View All →
        </Link>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="border-t border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Order ID</th>
              <th className="px-4 py-3 text-center font-semibold text-gray-600">Total Amount</th>
              <th className="px-4 py-3 text-center font-semibold text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan="3" className="px-4 py-8 text-center text-gray-500">
                  Loading recent orders...
                </td>
              </tr>
            ) : recentOrders.length === 0 ? (
              <tr>
                <td colSpan="3" className="px-4 py-8 text-center text-gray-500">
                  No recent orders found
                </td>
              </tr>
            ) : (
              recentOrders.map((order) => (
                <tr key={order.order_id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <Link 
                      to={`/orderdetail/${order.order_id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      #{order.order_id}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-center font-medium">
                    ${(order.total_amount || 0)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span 
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 ${getStatusStyle(order.status)}`}
                    >
                      {order.status || 'Unknown'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
