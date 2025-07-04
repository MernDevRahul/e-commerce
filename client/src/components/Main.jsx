import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "../store/slice/authSlice";
import { fetchProducts } from "../store/slice/productSlice";
import toast from "react-hot-toast";
import axios from "../utils/axios";
import { fetchCart } from "../store/slice/cartSlice";

const Main = ({ search }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { products } = useSelector((state) => state.product);
  useEffect(() => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (token) {
        dispatch(fetchCurrentUser());
        dispatch(fetchProducts());
        dispatch(fetchCart());
      }
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  },[]);
  const handleAddToCart = async (id) => {
    setLoading(true)
    try {
      const res = await axios.post("/cart/add", { id });
      if (res.status == 200) {
        dispatch(fetchCart());
        toast.success("Product added to Cart");
      }
    } catch (error) {
      toast.error("Failed to add");
    }finally{
      setLoading(false)
    }
  };

  const filterProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
        Our Products
      </h1>

      {loading ? (
        <div className="main">
          <div className="loading-wave">
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
      </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filterProducts?.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-contain"
              />

              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h2>
                <p className="text-indigo-600 font-bold mb-3">
                  ₹{product.price.toFixed(2)}
                </p>
                <button
                  onClick={() => handleAddToCart(product._id)}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Main;
