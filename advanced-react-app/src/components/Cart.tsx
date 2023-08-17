import React from "react";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
}

interface ProductInCart extends Product {
  quantity: number;
}

interface CartProps {
  cart: ProductInCart[];
  changeQuantity: (key: number, quantity: number) => void;
  onClose: () => void; // Thêm callback để ẩn giỏ hàng
}

const Cart: React.FC<CartProps> = ({ cart, changeQuantity, onClose }) => {
  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  const totalQuantity = cart.reduce(
    (total, product) => total + product.quantity,
    0
  );

  return (
    <div className="cart">
      <h1>Cart</h1>
      <ul className="list-product-cart">
        {cart.map((product, key) => (
          <li key={key}>
            <div>
              <img src={product.image} alt={product.name} />
            </div>
            <div>{product.name}</div>
            <div>{product.price.toLocaleString()} VNĐ</div>
            <div className="group-btn">
              <button
                onClick={() => changeQuantity(key, product.quantity - 1)}
                className="minus-btn"
              >
                -
              </button>
              <div className="count">{product.quantity}</div>
              <button
                onClick={() => changeQuantity(key, product.quantity + 1)}
                className="add-btn"
              >
                +
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="checkout">
        <div className="total">Total: {totalPrice.toLocaleString()} VNĐ</div>

        <div className="closeShopping" onClick={onClose}>
          Close
        </div>
      </div>
    </div>
  );
};

export default Cart;
