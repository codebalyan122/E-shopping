import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/CartSlice";
import { useNavigate } from "react-router-dom";

import { useGetAllProductsQuery } from "../features/ProductsApi";

const Home = () => {
  //  const {} =  useSelector(state=> state.products)
  const { data, error, isLoading } = useGetAllProductsQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };
  return (
    <div className="home-Container">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>An error Occured</p>
      ) : (
        <>
          <h2>New Arrivals</h2>
          <div className="products">
            {data?.map((product) => {
              return (
                <div key={product.id} className="product">
                  <h3>{product.name}</h3>
                  <img src={product.image} alt={product.name} />
                  <div className="details">
                    <span>{product.desc}</span>
                    <span className="price">${product.price}</span>
                  </div>
                  <button onClick={() => handleAddToCart(product)}>
                    Add to Cart
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
