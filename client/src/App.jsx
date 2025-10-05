import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashBoard />} />
          <Route path="menu" element={<Menu/>} />
          <Route path="fooddetail/:id" element={<FoodDetail />} />
          <Route path="addfood" element={<AddFood/>} />
          <Route path="orders" element={<Order/>} />
          <Route path="orderdetail/:id" element={<OrderDetail/>} />
          <Route path="createorder" element={<CreateOrder/>} />
          <Route path="customers" element={<Customers />} />
        </Route>
        {/* Redirect any unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
