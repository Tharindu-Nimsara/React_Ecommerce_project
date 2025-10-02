import { Link, useNavigate, useSearchParams } from "react-router";
import "./header.css";
import { useState } from "react";

export default function Header({ cart }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const searchText = searchParams.get("search");

  // || '' is a shortcut. It means if searchText does not exist
  // it will use a default value of ''.
  const [search, setSearch] = useState(searchText || "");

  let totalQuantity = 0;

  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  const searchBarChange = (event) => {
    const searchInput = event.target.value;
    setSearch(searchInput);
  };

  const clickSearch = () => {
    navigate(`/?search=${search}`);

    // setSearchInput(" ");
  };

  return (
    <>
      <div className="header">
        <div className="left-section">
          <Link to="/" className="header-link">
            <img className="logo" src="images/logo-white.png" />
            <img className="mobile-logo" src="images/mobile-logo-white.png" />
          </Link>
        </div>

        <div className="middle-section">
          <input
            className="search-bar"
            type="text"
            placeholder="Search"
            onChange={searchBarChange}
            value={search}
          />

          <button className="search-button" onClick={clickSearch}>
            <img className="search-icon" src="images/icons/search-icon.png" />
          </button>
        </div>

        <div className="right-section">
          <Link className="orders-link header-link" to="/orders">
            <span className="orders-text">Orders</span>
          </Link>

          <Link className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src="images/icons/cart-icon.png" />
            <div className="cart-quantity">{totalQuantity}</div>
            <div className="cart-text">Cart</div>
          </Link>
        </div>
      </div>
    </>
  );
}
