import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderDetailById } from "../../api/orderDetailApi";
import { updateOrderStatus } from "../../api/orderApi";

export default function OrderDetail() {
  const { id } = useParams();
  const [orderDetail, setOrderDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const data = await getOrderDetailById(id);
      setOrderDetail(data);
      setLoading(false);
    }
    fetchData();
  }, [id]);

  const handleStatusUpdate = async (newStatus) => {
    try {
      setUpdating(true);
      await updateOrderStatus(id, newStatus);
      const updatedData = await getOrderDetailById(id);
      setOrderDetail(updatedData);
      alert(`Order status updated to ${newStatus} successfully!`);
    } catch (error) {
      alert(`Error updating status: ${error.message}`);
    } finally {
      setUpdating(false);
    }
  };

  const subTotal = orderDetail.reduce((sum, item) => sum + item.subtotal, 0);
  const vat = subTotal * 0.1;
  const total = subTotal + vat;

  if (loading) return <p>Loading...</p>;
  
  const currentStatus = orderDetail[0]?.status;
  
  let statusStyle;
  if (currentStatus === "pending") {
    statusStyle = "text-orange-700";
  } else if (currentStatus === "confirmed") {
    statusStyle = "text-green-700";
  } else if (currentStatus === "completed") {
    statusStyle = "text-green-700";
  } else if (currentStatus === "cancelled") {
    statusStyle = "text-red-700";
  } else {
    statusStyle = "text-gray-700";
  }
  
  const getButtonConfig = () => {
    if (currentStatus === "pending") {
      return {
        primaryText: "Confirm",
        primaryAction: () => handleStatusUpdate("confirmed"),
        primaryDisabled: false,
        showCancel: true,
        cancelDisabled: false
      };
    } else if (currentStatus === "confirmed") {
      return {
        primaryText: "Complete",
        primaryAction: () => handleStatusUpdate("completed"),
        primaryDisabled: false,
        showCancel: true,
        cancelDisabled: true
      };
    } else {
      return {
        primaryText: "No Action",
        primaryAction: null,
        primaryDisabled: true,
        showCancel: true,
        cancelDisabled: true
      };
    }
  };

  const buttonConfig = getButtonConfig(); 
  return (
    <section className="space-y-6">
      <div className="flex">
        <p className="font-bold text-xl">Order Detail</p>
        <span className="ml-auto text-gray-500">Home &gt; Order Detail</span>
      </div>

      <div className="bg-white w-full mt-6 rounded-xl">
        <div className="py-6 px-6 flex items-center justify-between border-b-2 border-gray-100">
          <div>
            <p className="font-bold text-2xl ">
              Order ID: {id} |
              <span className="ml-3 text-sm text-gray-500">
                <span
                  className={`bg-gray-200 px-3 py-1 rounded-xl text-xs font-medium ${statusStyle}`}
                >
                  {orderDetail[0]?.status || "N/A"}
                </span>
              </span>
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {buttonConfig.showCancel && (
              <button 
                onClick={() => handleStatusUpdate("cancelled")}
                disabled={buttonConfig.cancelDisabled || updating}
                className={`w-32 h-12 border rounded-xl border-gray-400 flex items-center justify-center space-x-2 ${
                  buttonConfig.cancelDisabled || updating 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-white hover:bg-gray-100 text-gray-700'
                }`}
              >
                <span className="font-medium">
                  {updating ? "..." : "Cancel"}
                </span>
              </button>
            )}

            <button 
              onClick={buttonConfig.primaryAction}
              disabled={buttonConfig.primaryDisabled || updating || !buttonConfig.primaryAction}
              className={`w-32 h-12 border rounded-xl flex items-center justify-center space-x-2 ${
                buttonConfig.primaryDisabled || updating || !buttonConfig.primaryAction
                  ? 'bg-gray-400 border-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 border-blue-600 text-white'
              }`}
            >
              <span>
                {updating ? "Updating..." : buttonConfig.primaryText}
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white w-full mt-6 rounded-xl p-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">S.No</th>
              <th className="text-left p-2">Food</th>
              <th className="text-left p-2">Quantity</th>
              <th className="text-left p-2">Price</th>
              <th className="text-left p-2">Subtotal</th>
              <th className="text-left p-2">Note</th>
            </tr>
          </thead>
          <tbody>
            {orderDetail.map((item, index) => (
              <tr key={item.order_detail_id} className="border-b">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{item.food_name || item.food_id}</td>{" "}
                <td className="p-2">{item.quantity}</td>
                <td className="p-2">$ {item.price}</td>
                <td className="p-2">$ {item.subtotal}</td>
                <td className="p-2">{item.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex flex-wrap justify-between sm:justify-end p-6">
          <div className=" w-full space-y-1 text-right sm:w-[220px]">
            <p className="mb-4 text-left text-sm font-medium text-gray-800">
              Order summary
            </p>
            <ul className="space-y-2">
              <li className="flex justify-between gap-5">
                <span className="text-sm text-gray-500">Sub Total</span>
                <span className="text-sm font-medium text-gray-700 ">
                  $ {subTotal.toFixed(2)}
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-sm text-gray-500 ">Vat (10%):</span>
                <span className="text-sm font-medium text-gray-700 ">
                  $ {vat.toFixed(2)}
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="font-medium text-gray-700">Total</span>
                <span className="text-lg font-semibold text-gray-800">
                  $ {total.toFixed(2)}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
