import React from "react";

const CartItem = ({ item, updateQuantity, removeFromCart }) => {
  return (
    <div className="item" key={item.id}>
      <div className="flex">
        <img src={item.image} alt={item.title} />
        <p>{item.title}</p>
        <p>${item.price}</p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "15px",
        }}
      >
        <button
          className="counter_button"
          onClick={() => updateQuantity(item.quantity - 1, item.id)}
          disabled={item.quantity <= 1}
        >
          -
        </button>
        <input
          type="number"
          min={1}
          value={item.quantity}
          onChange={(e) => updateQuantity(parseInt(e.target.value), item.id)}
          style={{ padding: "10px 0" }}
        />
        <button
          onClick={() => updateQuantity(item.quantity + 1, item.id)}
          className="counter_button"
        >
          +
        </button>
        <button
          onClick={() => removeFromCart(item.id)}
          style={{
            color: "red",
            display: "block",
            marginLeft: "auto",
            padding: "3px 10px",
            cursor: "pointer",
            border: "none",
          }}
        >
          remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
