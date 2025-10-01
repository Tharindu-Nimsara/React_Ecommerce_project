import Header from "../../components/Header";
import "./OrdersPage.css";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import OrderDetailsGrid from "./OrderDetailsGrid";
import OrderHeader from "./OrderHeader";

export default function OrdersPage({ cart, loadCart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("/api/orders?expand=products").then((response) => {
      setOrders(response.data);
    });
  }, []);

  return (
    <>
      <title>Orders</title>

      <Header cart={cart} />
      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.map((order) => {
            return (
              <div key={order.id} className="order-container">
                <OrderHeader order={order} />
                
                <OrderDetailsGrid order_product={order.products} orderId={order.id} loadCart={loadCart} />
                
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
