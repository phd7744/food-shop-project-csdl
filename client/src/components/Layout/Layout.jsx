import { Outlet } from "react-router-dom";
import Header from "../Layout/Header.jsx"
import SideBar from "../Layout/SideBar.jsx"
export default function Layout(){
  return (
    <div className="bg-amber-50">
      <SideBar />
      <Header />
      <main className="ml-72 mt-16 p-6 bg-gray-100 min-h-screen overflow-y-auto">
        <Outlet/>
      </main>
    </div>
  );
}
