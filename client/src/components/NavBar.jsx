import homeImg from "../assets/img_navbar/home.png";
import menuIcon from "../assets/img_navbar/menu.png";
import orderIcon from "../assets/img_navbar/checklist.png"
import customerIcon from "../assets/img_navbar/customer.png"
import logoutIcon from "../assets/img_navbar/logout.png"
import dropDownIcon from "../assets/img_navbar/arrow.png"

export default function Navbar() {
  return (
    <section className="px-10 py-6 w-64 md:w-64 bg-amber-200 min-h-screen">
      <div>
        <h1 className="font-bold text-4xl">Food App</h1>
        <h4 className="text-gray-300">Admin Dashboard</h4>
      </div>
      <div className="mt-10 space-y-6">
        <div className="flex space-x-3 items-center">
          <img src={homeImg} alt="Home Icon" className='w-7 h-7' />
          <button>Dashboard</button>
        </div>
        <div className="flex space-x-3 items-center">
          <img src={menuIcon} alt="Home Icon" className='w-7 h-7' />
          <button>Menu</button>
          <img src={dropDownIcon} alt="Home Icon" className='w-5 h-5 ml-auto' />
        </div>
        <div className="flex space-x-3 items-center">
          <img src={orderIcon} alt="Home Icon" className='w-7 h-7' />
          <button>Order</button>
          <img src={dropDownIcon} alt="Home Icon" className='w-5 h-5 ml-auto' />
        </div>
        <div className="flex space-x-3 items-center">
          <img src={customerIcon} alt="Home Icon" className='w-7 h-7' />
          <button>Customers</button>
        </div>

        <div className="flex space-x-3 items-center">
          <img src={logoutIcon} alt="Home Icon" className='w-7 h-7' />
          <button>Logout</button>
        </div>
      </div>
    </section>
  );
}
