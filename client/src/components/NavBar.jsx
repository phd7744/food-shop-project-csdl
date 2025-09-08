import { useState } from "react";
import homeImg from "../assets/img_navbar/home.png";
import menuIcon from "../assets/img_navbar/menu.png";
import orderIcon from "../assets/img_navbar/checklist.png";
import customerIcon from "../assets/img_navbar/customer.png";
import logoutIcon from "../assets/img_navbar/logout.png";
import dropDownIcon from "../assets/img_navbar/arrow.png";

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const getArrowClass = (name) =>
    openDropdown === name
      ? "w-5 h-5 ml-auto rotate-180 transition-transform duration-300"
      : "w-5 h-5 ml-auto transition-transform duration-300";

  // const classNameTextChoose = openMenu ? "text-blue-200 " : null

  return (
    <section className="px-10 py-6 w-64 md:w-64 bg-amber-200 min-h-screen">
      <div>
        <h1 className="font-bold text-4xl">Food App</h1>
        <h4 className="text-gray-600">Admin Dashboard</h4>
      </div>
      <div className="mt-10 space-y-6">
        <div className="flex space-x-3 items-center p-2 rounded-lg hover:bg-gray-300">
          <img src={homeImg} alt="Home Icon" className="w-7 h-7" />
          <button>Dashboard</button>
        </div>
        <div>
          <div
            className="flex space-x-3 items-center p-2 rounded-lg hover:bg-gray-300"
            onClick={() => toggleDropdown("menu")}
          >
            <img src={menuIcon} alt="Home Icon" className="w-7 h-7" />
            <span>Menu</span>
            <img
              src={dropDownIcon}
              alt="Menu Icon"
              className={getArrowClass("menu")}
            />
          </div>
          {openDropdown == "menu" && (
            <div className="ml-10 mt-2 space-y-2 text-sm text-gray-700">
              <button className="block w-full text-left hover:text-gray-900">
                <span>Add Menu</span>
              </button>
              <button className="block w-full text-left hover:text-gray-900">
                List Menu
              </button>
            </div>
          )}
        </div>
        <div>
          <div className="flex space-x-3 items-center p-2 rounded-lg hover:bg-gray-300"
            onClick={() => toggleDropdown("order")}
          >
            <img src={orderIcon} alt="Order Icon" className="w-7 h-7" />
            <button>Order</button>
            <img
              src={dropDownIcon}
              alt="Home Icon"
              className={getArrowClass("order")}
            />
          </div>
          {openDropdown == "order" && (
            <div className="ml-10 mt-2 space-y-2 text-sm text-gray-700">
              <button className="block w-full text-left hover:text-gray-900">
                <span>Add Order</span>
              </button>
              <button className="block w-full text-left hover:text-gray-900">
                List Order
              </button>
            </div>
          )}
        </div>

        <div className="flex space-x-3 items-center p-2 rounded-lg hover:bg-gray-300">
          <img src={customerIcon} alt="Home Icon" className="w-7 h-7" />
          <button>Customers</button>
        </div>

        <div className="flex space-x-3 items-center p-2 rounded-lg hover:bg-gray-300">
          <img src={logoutIcon} alt="Home Icon" className="w-7 h-7" />
          <button>Logout</button>
        </div>
      </div>
    </section>
  );
}
