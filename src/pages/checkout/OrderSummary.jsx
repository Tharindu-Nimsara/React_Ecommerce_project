import DeliveryOptions from "./DeliveryOptions";
import CartItemDetails from "./CartItemDetails";
import DeliveryDate from "./DeliveryDate";

export default function OrderSummary({ cart, deliveryOptions, loadCart }) {
  return (
    <div>
      <div className="order-summary">
        {deliveryOptions.length > 0 &&
          cart.map((cartItem) => {
            const selectedDeliveryOption = deliveryOptions.find(
              (deliveryOption) => {
                return deliveryOption.id === cartItem.deliveryOptionId;
              }
            );

            return (
              <div className="cart-item-container" key={cartItem.productId}>
                
                <DeliveryDate selectedDeliveryOption={selectedDeliveryOption} />

                <div className="cart-item-details-grid">
                  <img className="product-image" src={cartItem.product.image} />

                  
                  <CartItemDetails cartItem={cartItem} />

                  <DeliveryOptions
                    deliveryOptions={deliveryOptions}
                    cartItem={cartItem}
                    loadCart={loadCart}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
