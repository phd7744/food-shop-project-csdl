import { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import downloadIcon from "../../assets/img_menu/download.png";
import searchIcon from "../../assets/img_navbar/loupe.png";
import {
  delOrderById,
  fetchOrder,
  updateOrderStatus,
} from "../../api/orderApi";
import { Link } from "react-router-dom";
export default function Orders() {
  const [orderList, setOrderList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [updating, setUpdating] = useState({});
  const itemsPerPage = 7;

  async function fetchData() {
    const data = await fetchOrder();
    setOrderList(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const filteredOrders = orderList.filter((order) =>
    order.order_id?.toString().includes(search)
  );

  async function handleDeleteOrder(e, id) {
    e.preventDefault();
    try {
      const result = await delOrderById(id);
      console.log("Order Delete:", result);
      alert("Xóa Order thành công!");
      fetchData();
    } catch (error) {
      console.error(error);
      alert("Xóa Order thất bại!");
    }
  }

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      setUpdating((prev) => ({ ...prev, [orderId]: true }));
      await updateOrderStatus(orderId, newStatus);
      await fetchData();

      alert(`Order #${orderId} status updated to ${newStatus} successfully!`);
    } catch (error) {
      alert(`Error updating status: ${error.message}`);
    } finally {
      setUpdating((prev) => ({ ...prev, [orderId]: false }));
    }
  };

  const getOrderButtonConfig = (order) => {
    const isUpdating = updating[order.order_id];
    const status = order.status;

    if (status === "pending") {
      return {
        primaryText: "Confirm",
        primaryAction: () => handleStatusUpdate(order.order_id, "confirmed"),
        primaryDisabled: isUpdating,
        showCancel: true,
        cancelDisabled: isUpdating,
      };
    } else if (status === "confirmed") {
      return {
        primaryText: "Complete",
        primaryAction: () => handleStatusUpdate(order.order_id, "completed"),
        primaryDisabled: isUpdating,
        showCancel: false,
        cancelDisabled: true,
      };
    } else {
      return {
        primaryText: "No Action",
        primaryAction: null,
        primaryDisabled: true,
        showCancel: false,
        cancelDisabled: true,
      };
    }
  };

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentorders = filteredOrders.slice(indexOfFirst, indexOfLast);

  return (
    <section>
      <div className="flex">
        <h2 className="font-bold text-xl">Order List</h2>
        <span className="ml-auto">Home &gt; Order List</span>
      </div>
      <div className="bg-white w-full min-h-screen mt-6 rounded-xl">
        <div className="py-6 px-6 flex items-center justify-between border-b-2 border-gray-100">
          <div>
            <h2 className="text-xl font-bold">Order List</h2>
            <p className="text-gray-400 text-sm">
              Track your store's progress to boost your sales.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center border rounded-xl w-60 h-12 px-3">
              <img
                src={searchIcon}
                alt="Search Icon"
                className="w-5 h-5 text-gray-500"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search"
                className="ml-2 flex-1 outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="text-left border-b border-gray-300">
              <tr>
                <th className="px-10 py-3 text-sm font-semibold text-gray-600">
                  OrderID
                </th>
                <th className="px-10 py-3 text-sm font-semibold text-gray-600">
                  Customer
                </th>
                <th className="px-10 py-3 text-sm font-semibold text-gray-600">
                  Date
                </th>
                <th className="px-10 py-3 text-sm font-semibold text-gray-600">
                  Status
                </th>
                <th className="px-10 py-3 text-sm font-semibold text-gray-600">
                  Payment
                </th>
                <th className="px-10 py-3 text-sm font-semibold text-gray-600">
                  Total Amount
                </th>
                <th className="px-10 py-3 text-sm font-semibold text-gray-600">
                  Status Actions
                </th>
                <th className="px-10 py-3 text-sm font-semibold text-gray-600">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentorders.map((order) => {
                let statusStyle;
                if (order.status === "pending") {
                  statusStyle = "text-orange-700";
                } else if (order.status === "confirmed") {
                  statusStyle = "text-green-700";
                } else if (order.status === "completed") {
                  statusStyle = "text-green-700";
                } else {
                  statusStyle = "text-red-700";
                }

                const buttonConfig = getOrderButtonConfig(order);
                const isUpdating = updating[order.order_id];

                return (
                  <tr
                    key={order.order_id}
                    className="border-b hover:bg-gray-50 "
                  >
                    <td className="px-10 py-10 font-medium">
                      #{order.order_id}
                    </td>
                    <td className="px-10 py-10">{order.full_name}</td>
                    <td className="px-10 py-10">
                      {new Date(order.order_date).toLocaleDateString()}
                    </td>
                    <td className="px-10 py-10">
                      <span
                        className={`bg-gray-200 px-3 py-1 rounded-xl text-xs font-medium ${statusStyle}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-10 py-10">{order.payment_method}</td>
                    <td className="px-10 py-10">$ {order.total_amount}</td>
                    <td className="px-10 py-10">
                      <div className="flex space-x-2">
                        {buttonConfig.showCancel && (
                          <button
                            onClick={() =>
                              handleStatusUpdate(order.order_id, "cancelled")
                            }
                            disabled={buttonConfig.cancelDisabled}
                            className={`px-3 py-1 text-xs rounded ${
                              buttonConfig.cancelDisabled || isUpdating
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-red-100 text-red-700 hover:bg-red-200"
                            }`}
                          >
                            {isUpdating ? "..." : "Cancel"}
                          </button>
                        )}

                        <button
                          onClick={buttonConfig.primaryAction}
                          disabled={
                            buttonConfig.primaryDisabled ||
                            !buttonConfig.primaryAction
                          }
                          className={`px-3 py-1 text-xs rounded ${
                            buttonConfig.primaryDisabled ||
                            !buttonConfig.primaryAction ||
                            isUpdating
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                              : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                          }`}
                        >
                          {isUpdating
                            ? "Updating..."
                            : buttonConfig.primaryText}
                        </button>
                      </div>
                    </td>
                    <td className="px-10 py-10 ">
                      <div className="flex space-x-2">
                        <Link
                          to={`/orderdetail/${order.order_id}`}
                          className="bg-blue-500 hover:bg-blue-600 px-3 py-1 text-white text-xs rounded inline-block"
                        >
                          View Detail
                        </Link>
                        <button
                          type="button"
                          onClick={(e) => handleDeleteOrder(e, order.order_id)}
                          disabled={isUpdating}
                          className={`w-16 h-8 text-xs rounded-sm ${
                            isUpdating
                              ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                              : "bg-red-500 hover:bg-red-700 text-white"
                          }`}
                        >
                          DELETE
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination
            totalItems={filteredOrders.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </section>
  );
}
