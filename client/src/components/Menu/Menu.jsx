import { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import downloadIcon from "../../assets/img_menu/download.png";
import addIcon from "../../assets/img_menu/plus.png";
import searchIcon from "../../assets/img_navbar/loupe.png";
import { useNavigate } from "react-router-dom";
import { fetchFoods } from "../../api/foodApi";
export default function Menu() {
  const [foodList, setFoodList] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  useEffect(() => {
    async function fetchData() {
      const data = await fetchFoods();
      setFoodList(data);
    }
    fetchData();
  }, []);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentFoods = foodList.slice(indexOfFirst, indexOfLast);

  return (
    <section>
      <div className="flex">
        <h2 className="font-bold text-xl">Food List</h2>
        <span className="ml-auto">Home &gt; Food List</span>
      </div>
      <div className="bg-white w-full min-h-screen mt-6 rounded-xl">
        <div className="py-6 px-6 flex items-center justify-between border-b-2 border-gray-100">
          <div>
            <h2 className="text-xl font-bold">Food List</h2>
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
                type="text"
                placeholder="Search"
                className="ml-2 flex-1 outline-none text-gray-700 placeholder-gray-400"
              />
            </div>

            <button className="w-32 h-12 border rounded-xl border-gray-400 bg-white hover:bg-gray-100 flex items-center justify-center space-x-2">
              <img src={downloadIcon} alt="Download Icon" className="w-6 h-6" />
              <span className="text-gray-700 font-medium">Export</span>
            </button>

            <button
              onClick={() => navigate("/addfood")}
              className="w-32 h-12 border rounded-xl bg-blue-600 hover:bg-blue-700 flex items-center justify-center space-x-2"
            >
              <img src={addIcon} alt="Download Icon" className="w-6 h-6" />
              <span className="text-white">Add Food</span>
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
              {currentFoods.map((food) => {
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
          <Pagination
            totalItems={foodList.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </section>
  );
}
