import userIcon from "../../assets/img_navbar/user.png";

export default function Header() {
  return (
    <header className="fixed top-0 left-72 right-0 h-16 bg-white shadow flex items-center px-6 z-10">
      <div className="flex items-center space-x-3 ml-auto">
        <div className="text-right">
          <h3 className="text-sm font-semibold">Pham Huu Dung</h3>
          <h4 className="text-xs text-gray-500">Admin</h4>
        </div>
        <img
          src={userIcon}
          alt="User Icon"
          className="w-10 h-10 rounded-full border"
        />
      </div>
    </header>
  );
}
