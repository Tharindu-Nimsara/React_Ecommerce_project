import React, { Fragment } from "react";
import OrderProduct from "./OrderProduct";

export default function OrderDetailsGrid({ order_product, orderId, loadCart }) {


  return (
    <div>
      <div className="order-details-grid">
        {order_product?.map((orderProduct) => {
          return (
            <OrderProduct key={orderProduct.product.id} orderProduct={orderProduct} orderId={orderId} loadCart={loadCart} />
          );
        })}
      </div>
    </div>
  );
}
