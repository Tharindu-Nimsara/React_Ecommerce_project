import axios from "axios";
import dayjs from "dayjs";
import React, { Fragment } from "react";

export default function OrderProduct({ orderProduct, orderId, loadCart }) {
  const addToCart = async () => {
    await axios.post("/api/cart-items", {
      productId: orderProduct.product.id,
      quantity: orderProduct.quantity,
    });
    await loadCart();
  };
  return (
    <Fragment>
      <div className="product-image-container">
        <img src={orderProduct.product.image} />
      </div>

      <div className="product-details">
        <div className="product-name">{orderProduct.product.name}</div>
        <div className="product-delivery-date">
          Arriving on:{" "}
          {dayjs(orderProduct.estimatedDeliveryTimeMs).format("MMMM D")}{" "}
        </div>
        <div className="product-quantity">
          Quantity: {orderProduct.quantity}{" "}
        </div>
        <button className="buy-again-button button-primary" onClick={addToCart}>
          <img className="buy-again-icon" src="images/icons/buy-again.png" />
          <span className="buy-again-message">Add to Cart</span>
        </button>
      </div>

      <div className="product-actions">
        <a href={`/tracking/${orderId}/${orderProduct.product.id}`}>
          <button className="track-package-button button-secondary">
            Track package
          </button>
        </a>
      </div>
    </Fragment>
  );
}
