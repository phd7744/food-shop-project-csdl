import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from "./components/DashBoard/DashBoard.jsx";
import Order from "./components/Orders/Orders.jsx";
import Menu from "./components/Menu/Menu.jsx";
import Layout from "./components/Layout/Layout";
import Customers from "./components/Customer/Customers.jsx";
import Login from "./components/Login/Login.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Layout/>}>
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/login" element={<Customers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
