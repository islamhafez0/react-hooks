import React, { useEffect, useReducer, useState } from "react";
import { Product } from "../components/Product";
import Cart from "../components/Cart";

const ACTIONS = {
  FETCH_SUCCESS: "succes",
  FETCH_FAILD: "faild",
  ADD_TO_CART: "add-to-cart",
  REMOVE_FROM_CART: "remove-from-cart",
  UPDATE_QUANTITY: "update-quantity",
};

const initialState = {
  data: [],
  loading: true,
  error: null,
  cart: [],
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.FETCH_SUCCESS:
      return { ...state, data: action.payload, loading: false, error: null };

    case ACTIONS.FETCH_FAILD:
      return { ...state, data: [], loading: false, error: action.payload };

    case ACTIONS.ADD_TO_CART:
      const newItem = action.payload;
      const existingItem = state.cart.find((item) => item.id === newItem.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return { ...state, cart: [...state.cart, { ...newItem, quantity: 1 }] };
      }

    case ACTIONS.REMOVE_FROM_CART:
      const removedProductId = action.payload;
      const updatedItems = state.cart.filter(
        (item) => item.id !== removedProductId
      );
      return { ...state, cart: updatedItems };

    case ACTIONS.UPDATE_QUANTITY:
      const { quantity, productId } = action.payload;
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        ),
      };

    default:
      return state;
  }
}

const DummyProducts = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const products = await response.json();
        dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: products });
      } catch (error) {
        dispatch({ type: ACTIONS.FETCH_FAILD, payload: error.message });
      }
    };
    fetchData();
  }, []);

  const addToCart = (product) => {
    dispatch({ type: ACTIONS.ADD_TO_CART, payload: product });
  };
  const removeFromCart = (id) => {
    dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: id });
  };

  const updateQuantity = (quantity, productId) => {
    dispatch({
      type: ACTIONS.UPDATE_QUANTITY,
      payload: { quantity, productId },
    });
  };

  return (
    <>
      <h1 style={{ textAlign: "center", padding: "40px 0 100px 0" }}>
        Our Products
      </h1>
      {state.loading && <p style={{ textAlign: "center" }}>Loading....</p>}
      {state.error && (
        <p style={{ textAlign: "center", color: "red" }}>{state.error}</p>
      )}
      <div className="grid">
        {state.data.map((product) => {
          return (
            <Product
              key={product.id}
              product={product}
              addToCart={() => addToCart(product)}
              setShowCart={setShowCart}
            />
          );
        })}
        {showCart && (
          <Cart
            removeFromCart={removeFromCart}
            cartItems={state.cart}
            setShowCart={setShowCart}
            showCart={showCart}
            updateQuantity={updateQuantity}
          />
        )}
      </div>
    </>
  );
};

export default DummyProducts;
