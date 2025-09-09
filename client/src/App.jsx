import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from "./components/DashBoard/DashBoard.jsx";
import Order from "./components/Orders/Orders.jsx";
import Menu from "./components/Menu/Menu.jsx";
import Layout from "./components/Layout/Layout";
import Customers from "./components/Customer/Customers.jsx";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/customers" element={<Customers/>} />
          <Route path="/login" element={<Customers/>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
