import { useEffect, useState } from "react";
import {
  addCustomer,
  fetchCustomer,
  fetchCustomerByPhone,
} from "../../api/customerApi";
import { fetchFoods } from "../../api/foodApi";
import { fetchOrder, addOrder } from "../../api/orderApi";
import { addOrderDetails } from "../../api/orderDetailApi";

export default function CreateOrder() {
  const [listOrderDetail, setListOrderDetail] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [foodList, setFoodList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [selectedFood, setSelectedFood] = useState({});
  const [foodInput, setFoodInput] = useState("");
  const [showFoodDropdown, setShowFoodDropdown] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [discount, setDiscount] = useState(0);
  const [customerName, setCustomerName] = useState("");

  useEffect(() => {
    async function fetchData() {
      const cusData = await fetchCustomer();
      const foodData = await fetchFoods();
      const orderData = await fetchOrder();
      setCustomerList(cusData);
      setFoodList(foodData);
      setOrderList(orderData);
    }
    fetchData();
  }, []);

  const nextOrderId =
    orderList.length > 0
      ? Math.max(...orderList.map((o) => o.order_id)) + 1
      : 1;

  const filteredFoods = foodList.filter((f) =>
    f.name.toLowerCase().includes(foodInput.toLowerCase())
  );

  const handleSelectFood = (food) => {
    if (!food.is_available) return;
    setSelectedFood(food);
    setFoodInput(food.name);
    setShowFoodDropdown(false);
  };

  function addQuantity() {
    setQuantity((prev) => prev + 1);
  }

  function subtractQuantity() {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  }

  const subTotal = listOrderDetail.reduce((sum, item) => sum + item.total, 0);
  const vat = subTotal * 0.1;
  const total = subTotal + vat;

  function handleSaveProduct() {
    if (!selectedFood || !selectedFood.food_id) {
      alert("Vui lòng chọn món trước khi lưu.");
      return;
    }

    const price = selectedFood.price || 0;
    const total = price * quantity * (1 - discount / 100);

    const newOrderItem = {
      id: selectedFood.food_id,
      name: selectedFood.name,
      price,
      quantity,
      discount,
      total,
    };

    setListOrderDetail((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === newOrderItem.id
      );

      if (existingIndex >= 0) {
        const updatedList = [...prev];
        updatedList[existingIndex] = {
          ...updatedList[existingIndex],
          quantity: updatedList[existingIndex].quantity + newOrderItem.quantity,
          total:
            (updatedList[existingIndex].quantity + newOrderItem.quantity) *
            price *
            (1 - discount / 100),
        };
        return updatedList;
      }

      return [...prev, newOrderItem];
    });

    setSelectedFood({});
    setFoodInput("");
    setQuantity(1);
    setDiscount(0);
  }

  function handleCheckPhone() {
    if (phone.length !== 10) {
      alert("Vui lòng nhập đủ 10 số.");
      return;
    }

    const found = customerList.find((c) => c.phone === phone);
    if (found) {
      setCustomerName(found.full_name);
      setSelectedCustomer(found);
    } else {
      setCustomerName("Unknown Customer");
      setSelectedCustomer({});
    }
  }

  async function handleSaveOrder() {
    if (!phone || listOrderDetail.length === 0) {
      alert("Vui lòng nhập số điện thoại và thêm ít nhất 1 sản phẩm!");
      return;
    }

    try {
      let customerId;
      const checkRes = await fetchCustomerByPhone(phone);
      if (checkRes.exists) {
        customerId = checkRes.customer.customer_id;
      } else {
        const dataNewCustomer = {
          full_name: customerName,
          phone,
        };
        const newCustomer = await addCustomer(dataNewCustomer);
        customerId = newCustomer.customer_id;
        console.log("New customer:", newCustomer);
        console.log("Customer ID:", customerId);
      }

      const orderRes = await addOrder({
        customer_id: customerId,
        total: total,
      });
      const newOrderId = orderRes.order_id;

      await addOrderDetails(newOrderId, listOrderDetail);

      alert("Đã lưu order thành công!");
      setListOrderDetail([]);
      setCustomerName("");
      setPhone("");
    } catch (err) {
      console.error("Lỗi khi lưu order:", err);
      alert("Có lỗi xảy ra khi lưu order!");
    }
  }

  return (
    <section className="space-y-6">
      <div className="flex">
        <p className="font-bold text-xl">Add Food</p>
        <span className="ml-auto text-gray-500">Home &gt; Create Order</span>
      </div>
      <div className="border rounded-xl bg-white px-6 py-6 space-y-6 shadow">
        <p className="font-bold text-2xl">Create Order</p>
        <form className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block font-bold text-lg">OrderID</label>
              <input
                type="text"
                name="orderid"
                value={nextOrderId}
                className="border w-full h-12 rounded-lg px-3 text-lg bg-gray-100"
                readOnly
              />
            </div>
            <div className="space-y-2">
              <label className="block font-bold text-lg">Customer Name</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="border w-full h-12 rounded-lg px-3 text-lg focus:ring-2 focus:ring-blue-400 outline-none disabled:bg-gray-100"
                placeholder="Enter Customer Name"
              />
            </div>
            <div className="space-y-2">
              <label className="block font-bold text-lg">Phone</label>
              <input
                type="number"
                name="phone"
                className="border w-full h-12 rounded-lg px-3 text-lg focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Enter Phone"
                onChange={(e) => setPhone(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleCheckPhone();
                  }
                }}
              />
            </div>
          </div>
          <div className="py-6">
            <table className="w-full border-collapse text-center border border-gray-400 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-100 h-16">
                  <td className="w-16">S.No</td>
                  <td>Products</td>
                  <td>Quantity</td>
                  <td>Unit Cost</td>
                  <td>Discount</td>
                  <td>Total</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {listOrderDetail.map((item, index) => (
                  <tr key={item.id || index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price}</td>
                    <td>{item.discount}%</td>
                    <td>${item.total.toFixed(2)}</td>
                    <td>
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() =>
                          setListOrderDetail(
                            listOrderDetail.filter((_, i) => i !== index)
                          )
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-5 gap-4">
            <div className="space-y-2 relative">
              <label className="block font-bold text-lg">Food Name</label>
              <input
                type="text"
                value={foodInput}
                onChange={(e) => {
                  setFoodInput(e.target.value);
                  setShowFoodDropdown(true);
                }}
                onFocus={() => setShowFoodDropdown(true)}
                className="border w-full h-12 rounded-lg px-3 text-lg focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Enter food name"
              />

              {showFoodDropdown && filteredFoods.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border rounded-lg shadow max-h-48 overflow-y-auto">
                  {filteredFoods.map((food) => {
                    const outOfStock = !food.is_available || food.stock === 0;
                    return (
                      <li
                        key={food.food_id}
                        onClick={() => handleSelectFood(food)}
                        className={`px-3 py-2 flex justify-between items-center cursor-pointer 
                      hover:bg-blue-100 
                      ${
                        outOfStock
                          ? "line-through text-gray-400 opacity-50 cursor-not-allowed hover:bg-white"
                          : ""
                      }`}
                      >
                        <span>{food.name}</span>
                        <span className="text-gray-600">${food.price}</span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            <div className="space-y-2">
              <label className="block font-bold text-lg">Price</label>
              <input
                type="text"
                value={selectedFood.price || ""}
                className="border w-full h-12 rounded-lg px-3 text-lg bg-gray-100"
                placeholder="Enter price"
                readOnly
              />
            </div>
            <div className="space-y-2">
              <label className="block font-bold text-lg">Quantity</label>
              <div className="grid grid-cols-3 w-full h-12 border rounded-lg">
                <button
                  type="button"
                  className="border-r"
                  onClick={subtractQuantity}
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  className="text-center"
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
                <button
                  type="button"
                  className="border-l"
                  onClick={addQuantity}
                >
                  +
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block font-bold text-lg">Discount</label>
              <select
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="w-full h-12 rounded-lg border p-2"
              >
                <option value="0">0%</option>
                <option value="10">10%</option>
                <option value="20">20%</option>
                <option value="50">50%</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block font-bold text-lg">
                <pre> </pre>
              </label>
              <button
                type="button"
                className="bg-blue-600 w-full h-12 text-white rounded-lg hover:bg-blue-700"
                onClick={handleSaveProduct}
              >
                Save Product
              </button>
            </div>
          </div>
          <div className="flex flex-wrap justify-between sm:justify-end">
            <div className=" w-full space-y-1 text-right sm:w-[220px]">
              <p className="mb-4 text-left text-sm font-medium text-gray-800">
                Order summary
              </p>
              <ul className="space-y-2">
                <li className="flex justify-between gap-5">
                  <span className="text-sm text-gray-500">Sub Total</span>
                  <span className="text-sm font-medium text-gray-700 ">
                    ${subTotal.toFixed(2)}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 ">Vat (10%):</span>
                  <span className="text-sm font-medium text-gray-700 ">
                    ${vat.toFixed(2)}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">Total</span>
                  <span className="text-lg font-semibold text-gray-800">
                    ${total.toFixed(2)}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              className="border border-gray-400 rounded-lg px-6 py-2 hover:bg-gray-100"
              onClick={() => console.log("Cancel clicked")}
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-blue-600 text-white rounded-lg px-6 py-2 hover:bg-blue-700"
              onClick={handleSaveOrder}
            >
              Save Order
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
