import DashBoard from "../DashBoard/DashBoard.jsx"
import Header from "../Layout/Header.jsx"
import Navbar from "../Layout/NavBar.jsx"
export default function Layout({children}) {
  return (
    <div className="bg-gray-50">
      <Navbar />
      <Header />
      <main className="ml-72 mt-16 p-6 bg-gray-100 min-h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
