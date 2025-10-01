import { Route, Routes } from "react-router";
import "./App.css";
import HomePage from "./pages/home/HomePage";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import OrdersPage from "./pages/orders/OrdersPage";
import TrackingPage from "./pages/tracking/TrackingPage";
import axios from "axios";
import { useEffect, useState } from "react";
import NotFoundPage from "./components/NotFoundPage";

function App() {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    const response = await axios.get("/api/cart-items?expand=product");
    setCart(response.data);
  };

  useEffect(() => {
    loadCart();
  });

  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage cart={cart} loadCart={loadCart} />}
      ></Route>
      <Route
        path="checkout"
        element={<CheckoutPage cart={cart} loadCart={loadCart} />}
      ></Route>
      <Route
        path="orders"
        element={<OrdersPage cart={cart} loadCart={loadCart} />}
      ></Route>
      <Route
        path="tracking/:orderId/:productId"
        element={<TrackingPage cart={cart} />}
      ></Route>
      <Route path="*" element={<NotFoundPage cart={cart} />}></Route>
    </Routes>
  );
}

export default App;
