import React, { Fragment } from "react";
import CartItem from "./CartItem";

const Cart = ({
  cartItems,
  setShowCart,
  removeFromCart,
  showCart,
  updateQuantity,
}) => {
  if (!cartItems) {
    return <p>Items not found</p>;
  }

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.quantity * parseFloat(item.price),
    0
  );

  return (
    <div className={`cart ${showCart ? "show" : "hide"}`}>
      <div>
        <h2 style={{ padding: "10px 0" }}>Your Cart</h2>
        {cartItems.length === 0 && (
          <p style={{ textAlign: "center" }}>Your Cart Is Empty</p>
        )}
        {cartItems.map((item) => {
          return (
            <CartItem
              item={item}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
            />
          );
        })}
        <button
          onClick={() => setShowCart(false)}
          style={{
            padding: "5px 10px",
            position: "absolute",
            top: 10,
            right: 10,
            cursor: "pointer",
          }}
        >
          x
        </button>
      </div>
      <div>Total Price: {totalPrice.toFixed(2)}</div>
    </div>
  );
};

export default Cart;
