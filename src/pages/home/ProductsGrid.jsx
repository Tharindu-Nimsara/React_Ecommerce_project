import Product from "./Product";

export default function ProductsGrid({ products, loadCart }) {
  return (
    <div>
      <div className="products-grid">
        {products.map((item) => {
          return <Product key={item.id} item={item} loadCart={loadCart} />;
        })}
      </div>
    </div>
  );
}
