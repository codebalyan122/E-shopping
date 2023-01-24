import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import ProductsReducer, { productsDetails } from "./features/ProductsSlice";
import { ProductsApi } from "./features/ProductsApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import CartReducer, { getTotal } from "./features/CartSlice";

const store = configureStore({
  reducer: {
    products: ProductsReducer,
    cart: CartReducer,
    [ProductsApi.reducerPath]: ProductsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(ProductsApi.middleware);
  },
});

store.dispatch(productsDetails());
store.dispatch(getTotal());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
