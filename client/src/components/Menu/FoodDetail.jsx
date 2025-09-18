import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFoodById } from "../../api/foodApi";
import { fetchCategory } from "../../api/categoryApi";
import { updateFood } from "../../api/foodApi";

export default function FoodDetail() {
  const { id } = useParams();
  const [foodById, setFoodByID] = useState({});
  const [category, setCategory] = useState([]);

  useEffect(() => {
    async function fetchFoodId() {
      const data = await getFoodById(id);
      setFoodByID(data);
    }
    fetchFoodId();
  }, [id]);

  useEffect(() => {
    async function fetchCategoryData() {
      const data = await fetchCategory();
      setCategory(data);
    }
    fetchCategoryData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodByID((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit (e){
    e.preventDefault();
    try {
      await updateFood(id, foodById);
      alert("Update food success!");
    } catch (err) {
      console.error("Update food error:", err);
      alert("Update food failed!");
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex">
        <p className="font-bold text-xl">Add Food</p>
        <span className="ml-auto text-gray-500">Home &gt; Add Food</span>
      </div>
      <div className="border rounded-xl bg-white px-6 py-6 space-y-6 shadow">
        <p className="font-bold text-2xl">Food Description</p>
        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block font-bold text-lg">Food Name</label>
              <input
                value={foodById.name}
                onChange={handleChange}
                type="text"
                name="name"
                className="border w-full h-12 rounded-lg px-3 text-lg focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Enter food name"
              />
            </div>
            <div className="space-y-2">
              <label className="block font-bold text-lg">Category</label>
              <select
                name="category_id"
                value={foodById.category_id}
                onChange={handleChange}
                className="border w-full h-12 rounded-lg px-3 text-lg bg-white focus:ring-2 focus:ring-blue-400 outline-none"
              >
                {category.map((c) => {
                  return (
                    <option
                      key={c.category_id}
                      value={c.category_id}
                      placeholder="Select Category"
                    >
                      {c.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block font-bold text-lg">Price</label>
              <input
                value={foodById.price}
                type="number"
                name="price"
                onChange={handleChange}
                className="border w-full h-12 rounded-lg px-3 text-lg focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Enter price"
              />
            </div>
            <div className="space-y-2">
              <label className="block font-bold text-lg">Availability</label>
              <select
                value={foodById.is_available}
                onChange={handleChange}
                name="is_available"
                className="border w-full h-12 rounded-lg px-3 text-lg bg-white focus:ring-2 focus:ring-blue-400 outline-none"
              >
                <option value="1">In Stock</option>
                <option value="0">Out of Stock</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="block font-bold text-lg">Description</label>
            <textarea
              value={foodById.description}
              name="description"
              onChange={handleChange}
              className="border w-full rounded-lg h-32 px-3 py-2 text-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter a description of the dish"
            />
          </div>

          <div className="space-y-2">
            <p className="font-bold text-xl">Products Images</p>
            <label
              htmlFor="file-upload"
              className="border-2 border-dashed border-gray-300 rounded-xl w-full h-48 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-gray-50 transition overflow-hidden"
            >
              {foodById.img_url ? (
                <img
                  src={foodById.img_url}
                  alt={foodById.name || "food image"}
                  className="h-full object-contain"
                />
              ) : (
                <span className="text-gray-400">Click to upload image</span>
              )}
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              className="hidden"
            />
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
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-600 text-white rounded-lg px-6 py-2 hover:bg-blue-700"
            >
              Save Food
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
