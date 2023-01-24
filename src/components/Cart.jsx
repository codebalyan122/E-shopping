import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotal,
  removeFromCart,
} from "../features/CartSlice";

const Cart = () => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotal());
  }, [cart, dispatch]);

  const removeItem = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  const decreaseQuantity = (cartItem) => {
    dispatch(decreaseCart(cartItem));
  };

  const increaseCartQuantity = (cartItem) => {
    dispatch(addToCart(cartItem));
  };

  const clearCartItems = (cartItem) => {
    dispatch(clearCart(cartItem));
  };

  return (
    <div className="cart-container">
      <h2>CART ITEMS</h2>
      {cart.cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is Empty</p>
          <div className="start-shopping">
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-left-circle"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
                />
              </svg>
              <span> Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="titles">
            <h3 className="product-title">Product</h3>
            <h3 className="price">Price</h3>
            <h3 className="quantity">Quantity</h3>
            <h3 className="total">Total</h3>
          </div>
          <div className="cart-items">
            {cart.cartItems?.map((cartItem) => (
              <div className="cart-item" key={cartItem.id}>
                <div className="cart-product">
                  <img src={cartItem.image} alt={cartItem.name} />
                  <div>
                    <h3>{cartItem.name}</h3>
                    <p>{cartItem.desc}</p>
                    <button onClick={() => removeItem(cartItem)}>Remove</button>
                  </div>
                </div>
                <div className="cart-product-price">${cartItem.price}</div>
                <div className="cart-product-quantity">
                  <button onClick={() => decreaseQuantity(cartItem)}>-</button>
                  <div className="count">{cartItem.cartQuantity}</div>
                  <button onClick={() => increaseCartQuantity(cartItem)}>
                    +
                  </button>
                </div>
                <div className="cart-product-total-price">
                  ${cartItem.price * cartItem.cartQuantity}
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <button className="clear-cart" onClick={() => clearCartItems([])}>
              Clear Cart
            </button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>SubTotal</span>
                <span className="amount">${cart.cartTotalAmount}</span>
              </div>
              <p>Taxes and Shipping calculated at Checkout</p>
              <button>Check Out</button>
              <div className="continue-shopping">
                <Link to="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-left-circle"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
                    />
                  </svg>
                  <span> contiune Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
