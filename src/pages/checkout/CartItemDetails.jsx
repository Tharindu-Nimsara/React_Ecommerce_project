import React, { useState } from "react";
import formatMoney from "../../utils/money";
import axios from "axios";

export default function CartItemDetails({
  cartItem,
  deleteCartItem,
  loadCart,
}) {
  const [isUpdated, setIsUpdated] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const updateOnClick = () => {
    if (isUpdated) {
      // If in edit mode, save the changes
      const requestFunction = async () => {
        await axios.put(`/api/cart-items/${cartItem.productId}`, {
          quantity: Number(quantity),
        });
        await loadCart();
      };
      requestFunction();
    }
    // Toggle edit mode
    setIsUpdated(!isUpdated);
  };
  const changeQuantity = (event) => {
    const q = event.target.value;
    setQuantity(q);
  };

  const inputKeydown = (event) => {
    const keyPressed = event.key;
    if (keyPressed === "Enter") {
      updateOnClick();
    } else if (keyPressed === "Escape") {
      setQuantity(cartItem.quantity);
      setIsUpdated(false);
    }
  };

  return (
    <div>
      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:{" "}
            <input
              type="text"
              className="checkout-quantity-input"
              style={{ opacity: isUpdated ? 1 : 0 }}
              value={quantity}
              onChange={changeQuantity}
              onKeyDown={inputKeydown}
            />
            <span
              className="quantity-label"
              style={{ opacity: isUpdated ? 0 : 1 }}
            >
              {cartItem.quantity}
            </span>
          </span>
          <span
            className="update-quantity-link link-primary"
            onClick={updateOnClick}
          >
            {" "}
            Update{" "}
          </span>
          <span
            className="delete-quantity-link link-primary link-red"
            onClick={() => {
              deleteCartItem();
            }}
            // this is for avoiding an error
            onChange={() => {}}
          >
            <br></br> <br></br> Delete
          </span>
        </div>
      </div>
    </div>
  );
}
