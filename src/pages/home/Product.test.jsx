import { render, screen } from "@testing-library/react";
import { expect, it, describe, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import Product from "./Product";

//creating a fake version of axios
vi.mock("axios");

describe("Product component", () => {
  let product;
  let loadCart;

  beforeEach(() => {
    product = {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87,
      },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"],
    };
    //mocking loadCart and replacing it with a fake function
    loadCart = vi.fn();
  });

  it("displays the product details correctly", () => {
    render(<Product item={product} loadCart={loadCart} />);
    //above code is for rendering the product component

    //below we test sub elements (eg:images, texts) of prouduct components are displayed without errors.
    expect(
      screen.getByText("Black and Gray Athletic Cotton Socks - 6 Pairs")
    ).toBeInTheDocument();

    expect(screen.getByText("$10.90")).toBeInTheDocument();

    expect(screen.getByTestId("product-image")).toHaveAttribute(
      "src",
      "images/products/athletic-cotton-socks-6-pairs.jpg"
    );

    expect(screen.getByTestId("product-rating-start-image")).toHaveAttribute(
      "src",
      "images/ratings/rating-45.png"
    );
    expect(screen.getByText("87")).toBeInTheDocument();
  });

  it("add a product to the cart", async () => {
    render(<Product item={product} loadCart={loadCart} />);
    //above code is for rendering the product component

    const user = userEvent.setup();
    const addToCartButton = screen.getByTestId("add-to-cart-button");
    await user.click(addToCartButton);

    expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1,
    });

    expect(loadCart).toHaveBeenCalled();
  });
});
