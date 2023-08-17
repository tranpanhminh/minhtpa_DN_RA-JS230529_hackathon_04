import React, { useState } from "react";
import Products from "./components/Products";
import Cart from "./components/Cart";
import "./components/style.css";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
}

interface ProductInCart extends Product {
  quantity: number;
}

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: "Iphone 14 Pro Max",
      image: "https://vuatao.vn/wp-content/uploads/2022/09/Untitled-4-1.png",
      price: 26490000,
    },
    {
      id: 2,
      name: "Iphone 13 Pro Max",
      image:
        "https://vuatao.vn/wp-content/uploads/2021/09/iphone-13-pro-max-blue-select.png",
      price: 24290000,
    },
    {
      id: 3,
      name: "Iphone 12 Pro Max",
      image: "https://pngimg.com/d/iphone_12_PNG11.png",
      price: 23490000,
    },
    {
      id: 4,
      name: "Iphone 11 Pro Max",
      image:
        "https://product.hstatic.net/1000329106/product/iphone-11-pro-max-didongviet_1_1_4a1a42d74deb4f86b60a5f8a38783840_grande.png",
      price: 12090000,
    },
    {
      id: 5,
      name: "Iphone X",
      image:
        "https://damluongstore.com.vn/wp-content/uploads/2018/10/iphoneX-silver.png",
      price: 7690000,
    },
    {
      id: 6,
      name: "Iphone 8",
      image:
        "https://cdn.viettablet.com/images/detailed/27/iphone-9-cu-like-new.png",
      price: 3890000,
    },
  ]);
  const [cart, setCart] = useState<ProductInCart[]>([]);

  const addToCart = (key: number) => {
    const existingProduct = cart.find(
      (product) => product.id === products[key].id
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      const newProduct: ProductInCart = { ...products[key], quantity: 1 };
      setCart([...cart, newProduct]);
    }
  };

  const changeQuantity = (key: number, quantity: number) => {
    if (quantity === 0) {
      const updatedCart = cart.filter((_, index) => index !== key);
      setCart(updatedCart);
    } else {
      const updatedCart = cart.map((product, index) =>
        index === key
          ? {
              ...product,
              quantity,
              price: quantity * products[product.id - 1].price,
            }
          : product
      );
      setCart(updatedCart);
    }
  };

  const totalQuantity = cart.reduce(
    (total, product) => total + product.quantity,
    0
  );

  return (
    <div className={`container ${isOpen ? "active" : ""}`}>
      <header>
        <h1>Shopping Cart</h1>
        <div className="shopping-cart" onClick={() => setIsOpen(true)}>
          <img
            src="https://static.vecteezy.com/system/resources/previews/019/787/018/original/shopping-cart-icon-shopping-basket-on-transparent-background-free-png.png"
            alt="Shopping Cart"
            className="shopping-cart-icon"
          />
          <span className="quantity">{totalQuantity}</span>
        </div>
      </header>

      <Products products={products} addToCart={addToCart} />

      <Cart
        cart={cart}
        changeQuantity={changeQuantity}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default App;
