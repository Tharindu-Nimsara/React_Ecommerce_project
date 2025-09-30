import dayjs from "dayjs";
import React from "react";

export default function DeliveryDate({selectedDeliveryOption}) {
  return (
    <div>
      <div className="delivery-date">
        Delivery date:{" "}
        {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format(
          "dddd, MMMM D"
        )}
      </div>
    </div>
  );
}
