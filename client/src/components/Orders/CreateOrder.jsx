import { useEffect, useState } from "react";
import { fetchCustomer } from "../../api/customerApi";
import { fetchFoods } from "../../api/foodApi";

export default function CreateOrder() {
  const [customerList, setCustomerList] = useState([]);
  const [foodList, setFoodList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [selectedFood, setSelectedFood] = useState({});
  const [phone, setPhone] = useState('');
  const [search, setSearch] = useState('');
  const [customer, setCustomer] = useState('');

  useEffect(() => {
    async function fetchData() {
      const cusData = await fetchCustomer();
      const foodData = await fetchFoods();
      setCustomerList(cusData);
      setFoodList(foodData);
    }
    fetchData();
  }, []);

  const findCustomer = customerList.filter((c) => {
    if(c.phone === search) {
      setCustomer(c.full_name);
    } else {
      se
    }
  })
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
                className="border w-full h-12 rounded-lg px-3 text-lg bg-gray-100"
                placeholder="Enter food name"
                readOnly
              />
            </div>
            <div className="space-y-2">
              <label className="block font-bold text-lg">Customer Name</label>
              <input
                list="list"
                type="text"
                name="customername"
                className="border w-full h-12 rounded-lg px-3 text-lg focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Enter Customer Name"
              />
              <datalist id="list">
                {customerList.map(customer => (
                  <option value={customer.full_name}>{customer.full_name}</option>
                ))}
              </datalist>
            </div>
            <div className="space-y-2">
              <label className="block font-bold text-lg">Phone</label>
              <input
                type="text"
                inputMode="tel"
                name="phone"
                className="border w-full h-12 rounded-lg px-3 text-lg focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Enter Phone"
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
              <tbody></tbody>
            </table>
          </div>

          <div className="grid grid-cols-5 gap-4">
            <div className="space-y-2">
              <label className="block font-bold text-lg">Food Name</label>
              <input
                type="text"
                name="orderid"
                className="border w-full h-12 rounded-lg px-3 text-lg focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Enter food name"
              />
            </div>
            <div className="space-y-2">
              <label className="block font-bold text-lg">Price</label>
              <input
                type="text"
                name="orderid"
                className="border w-full h-12 rounded-lg px-3 text-lg bg-gray-100"
                placeholder="Enter food name"
                readOnly
              />
            </div>
            <div className="space-y-2">
              <label className="block font-bold text-lg">Quantity</label>
              <div className="grid grid-cols-3 w-full h-12 border rounded-lg">
                <button type="button" className="border-r">
                  -
                </button>
                <input type="number" className="text-center" />
                <button type="button" className="border-l">
                  +
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block font-bold text-lg">Discount</label>
              <select className="w-full h-12 rounded-lg border p-2">
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
                className="bg-blue-600 w-full h-12 text-white rounded-lg  hover:bg-blue-700"
              >
                Save Product
              </button>
            </div>
          </div>
          <div class="flex flex-wrap justify-between sm:justify-end">
            <div class=" w-full space-y-1 text-right sm:w-[220px]">
              <p class="mb-4 text-left text-sm font-medium text-gray-800">
                Order summary
              </p>
              <ul class="space-y-2">
                <li class="flex justify-between gap-5">
                  <span class="text-sm text-gray-500">Sub Total</span>
                  <span class="text-sm font-medium text-gray-700 ">
                    $2650.00
                  </span>
                </li>
                <li class="flex items-center justify-between">
                  <span class="text-sm text-gray-500 ">Vat (10%):</span>
                  <span class="text-sm font-medium text-gray-700 ">
                    $265.00
                  </span>
                </li>
                <li class="flex items-center justify-between">
                  <span class="font-medium text-gray-700">Total</span>
                  <span class="text-lg font-semibold text-gray-800">
                    $2915.00
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
            >
              Save Order
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
