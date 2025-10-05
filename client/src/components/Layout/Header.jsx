import userIcon from "../../assets/img_navbar/user.png";
import logoutIcon from "../../assets/img_navbar/logout.png";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'Admin';

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-72 right-0 h-16 bg-white shadow flex items-center px-6 z-10">
      <div className="flex items-center space-x-3 ml-auto">
        <div className="text-right">
          <h3 className="text-sm font-semibold">{username}</h3>
          <h4 className="text-xs text-gray-500">Admin</h4>
        </div>
        <img
          src={userIcon}
          alt="User Icon"
          className="w-10 h-10 rounded-full border"
        />
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Logout"
        >
          <img
            src={logoutIcon}
            alt="Logout Icon"
            className="w-4 h-4"
          />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}
