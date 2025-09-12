import { useEffect, useState } from "react";

export default function Menu() {
  const [foodList, setFoodList] = useState([]);
  async function fetchFoods() {
    const reponse = await fetch("http://localhost:3000/foods");
    const data = await reponse.json();
    setFoodList(data);
  }

  useEffect(() => {
    fetchFoods();
  }, []);

  return (
    <section>
      <div className="flex">
        <h2 className="font-bold text-xl">Food List</h2>
        <span className="ml-auto">Home &gt; Food List</span>
      </div>
      <div className="bg-white w-full min-h-screen mt-6 rounded-xl">
        <div className="py-6 flex border-b-2 border-gray-100">
          <div className="px-6">
            <h2 className="text-xl font-bold">Food List</h2>
            <p className="text-gray-400 text-sm">
              Track your store's progress to boost your sales.
            </p>
          </div>
          <div className="ml-auto space-x-2 px-6">
            <button className="w-32 h-12 border rounded-xl border-gray-400 bg-white  hover:bg-gray-100">
              Export
            </button>
            <button className="w-32 h-12 border rounded-xl bg-blue-600 hover:bg-blue-700 text-white">
              Add Food
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="text-left border-b border-gray-300">
              <tr>
                <th className="px-10 py-3 text-sm font-semibold text-gray-600">
                  Foods
                </th>
                <th className="px-10 py-3 text-sm font-semibold text-gray-600">
                  Category
                </th>
                <th className="px-10 py-3 text-sm font-semibold text-gray-600">
                  Price
                </th>
                <th className="px-10 py-3 text-sm font-semibold text-gray-600">
                  Stock
                </th>
                <th className="px-10 py-3 text-sm font-semibold text-gray-600">
                  Created At
                </th>
                <th className="px-10 py-3 text-sm font-semibold text-gray-600">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {foodList.map((food) => {
                const statusStyle =
                  food.is_available === 1 ? "text-red-700" : "text-green-700";
                const statusText =
                  food.is_available === 1 ? "In Stock" : "Out Of Stock";
                return (
                  <tr key={food.food_id} className="border-b hover:bg-gray-50 ">
                    <td className="px-10 py-10">{food.name}</td>
                    <td className="px-10 py-10">{food.category_id}</td>
                    <td className="px-10 py-10">{food.price}</td>
                    <td className="px-10 py-10">
                      <span
                        className={`bg-gray-100 px-3 py-1 rounded-xl text-xs font-medium ${statusStyle}`}
                      >
                        {statusText}
                      </span>
                    </td>
                    <td className="px-10 py-10">
                      {new Date(food.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-10 py-10">
                      <button className="bg-red-500 hover:bg-red-700 w-16 h-8 text-white text-sm rounded-sm">
                        DELETE
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
