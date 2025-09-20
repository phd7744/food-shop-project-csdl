import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from "./components/DashBoard/DashBoard.jsx";
import Order from "./components/Orders/Orders.jsx";
import Menu from "./components/Menu/Menu.jsx";
import FoodDetail from "./components/Menu/FoodDetail.jsx";
import Layout from "./components/Layout/Layout";
import Customers from "./components/Customer/Customers.jsx";
import Login from "./components/Login/Login.jsx";
import AddFood from "./components/Menu/AddFood.jsx";
import OrderDetail from "./components/Orders/OrderDetail.jsx";
import CreateOrder from "./components/Orders/CreateOrder.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Layout/>}>
          <Route path="/" element={<DashBoard />} />
          <Route path="/menu" element={<Menu/>} />
          <Route path="/fooddetail/:id" element={<FoodDetail />} />
          <Route path="/addfood" element={<AddFood/>} />
          <Route path="/orders" element={<Order/>} />
          <Route path="/orderdetail" element={<OrderDetail/>} />
          <Route path="/createorder" element={<CreateOrder/>} />
          <Route path="/customers" element={<Customers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
