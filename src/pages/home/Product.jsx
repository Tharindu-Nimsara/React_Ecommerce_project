import axios from "axios";
import React, { useState } from "react";
import formatMoney from "../../utils/money";

export default function Product({ item, loadCart }) {
  const [quantity, setQuantity] = useState(1);
  const [cls, setCls] = useState("added-to-cart");

  function getQuantity(event) {
    const quantitySelected = Number(event.target.value);
    setQuantity(quantitySelected);
  }

  const addToCart = async () => {
    await axios.post("/api/cart-items", {
      productId: item.id,
      quantity: quantity,
    });
    await loadCart();

    setCls("added-to-cart-visible")
  };

  return (
    <div>
      <div className="product-container">
        <div className="product-image-container">
          <img className="product-image" src={item.image} />
        </div>

        <div className="product-name limit-text-to-2-lines">{item.name}</div>

        <div className="product-rating-container">
          <img
            className="product-rating-stars"
            src={`images/ratings/rating-${item.rating.stars * 10}.png`}
          />
          <div className="product-rating-count link-primary">
            {item.rating.count}
          </div>
        </div>

        <div className="product-price">{formatMoney(item.priceCents)}</div>

        <div className="product-quantity-container">
          <select value={quantity} onChange={getQuantity}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div className="product-spacer"></div>

        <div className={cls}>
          <img src="images/icons/checkmark.png" />
          Added
        </div>

        <button
          className="add-to-cart-button button-primary"
          onClick={addToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
