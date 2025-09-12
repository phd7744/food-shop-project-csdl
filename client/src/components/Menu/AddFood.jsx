import { useEffect, useState } from "react";
import { fetchCategory } from "../../api/categoryApi";
import { addFood, toBase64 } from "../../api/foodApi";

export default function AddFood() {
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [availability, setavailability] = useState("");

  

  useEffect(() => {
    async function fetchData() {
      const data = await fetchCategory();
      setCategories(data);
    }
    fetchData();
  }, []);

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImage(URL.createObjectURL(file));
    }
  }

  function clearForm() {
    setSelectedCategory("");
    setName("");
    setPrice("");
    setDescription("");
    setavailability("");
    setImage("");
  }


  async function handleAddFood(e) {
    e.preventDefault();
    try {
      let imageBase64 = "";
      if (imageFile) {
        imageBase64 = await toBase64(imageFile);
      }

      const data = {
        category_id: selectedCategory,
        name: name,
        price: price,
        description: description,
        is_available: availability,
        img_url: imageBase64,
      };
      const result = await addFood(data);
      console.log("Food Added:", result);
      alert("Thêm món thành công!");
      clearForm();
    } catch (error) {
      console.error(error);
      alert("Thêm món thất bại!");
      clearForm();
    }
  }

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
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
                className="border w-full h-12 rounded-lg px-3 text-lg focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Enter food name"
              />
            </div>
            <div className="space-y-2">
              <label className="block font-bold text-lg">Category</label>
              <select
                name="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border w-full h-12 rounded-lg px-3 text-lg bg-white focus:ring-2 focus:ring-blue-400 outline-none"
              >
                <option value="" disabled hidden>
                  Select a category
                </option>
                {categories.map((c) => {
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
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                name="price"
                className="border w-full h-12 rounded-lg px-3 text-lg focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Enter price"
              />
            </div>
            <div className="space-y-2">
              <label className="block font-bold text-lg">Availability</label>
              <select
                name="availability"
                value={availability}
                onChange={(e) => setavailability(e.target.value)}
                className="border w-full h-12 rounded-lg px-3 text-lg bg-white focus:ring-2 focus:ring-blue-400 outline-none"
              >
                <option value="">Select Availability</option>
                <option value="1">In Stock</option>
                <option value="0">Out of Stock</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="block font-bold text-lg">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="description"
              className="border w-full rounded-lg h-32 px-3 py-2 text-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter a description of the dish"
            />
          </div>

          <div className="space-y-2">
            <p className="font-bold text-xl">Products Images</p>

            <label
              htmlFor="file-upload"
              className="border-2 border-dashed border-gray-300 rounded-xl w-full h-48 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-gray-50 transition"
            >
              {image ? (
                <img
                  src={image}
                  alt="Preview"
                  className="max-h-40 object-contain rounded-lg"
                />
              ) : (
                <p className="text-gray-700">
                  <span className="text-blue-600 font-medium">
                    Click to upload
                  </span>{" "}
                  SVG, PNG, JPG, GIF (MAX 800x400px)
                </p>
              )}
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
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
              className="bg-blue-600 text-white rounded-lg px-6 py-2 hover:bg-blue-700"
              onClick={handleAddFood}
            >
              Save Food
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
