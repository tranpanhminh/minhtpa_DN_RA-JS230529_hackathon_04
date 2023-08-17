import React from "react";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
}

interface ProductsProps {
  products: Product[];
  addToCart: (key: number) => void;
}

const Products: React.FC<ProductsProps> = ({ products, addToCart }) => {
  return (
    <div className="products-container">
      {products.map((product, key) => (
        <div key={key} className="product-item">
          <img src={product.image} alt={product.image} />
          <div className="title">{product.name}</div>
          <div className="price">Giá: {product.price.toLocaleString()} VNĐ</div>
          <button onClick={() => addToCart(key)}>Add To Cart</button>
        </div>
      ))}
    </div>
  );
};

export default Products;
