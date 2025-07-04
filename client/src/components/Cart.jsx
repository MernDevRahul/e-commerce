import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../store/slice/cartSlice';
import { FaTrash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, loading } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const removeItem = (id) => {
    console.warn("Remove item logic not implemented.");
  };

  const handlePlaceOrder = () => {
    navigate("/order")
  };

  const totalPrice = cart?.reduce(
    (sum, item) => sum + item?.productId?.price * item?.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-md p-6">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">Your Cart</h2>

        {loading ? (
          <div className='main'>
            <div className="loading-wave">
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
        </div>
          </div>
        ) : cart?.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-6">
            {cart?.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between gap-4 border-b pb-4"
              >
                <img
                  src={item.productId.image}
                  alt={item.productId.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{item.productId.name}</h3>
                  <p className="text-gray-600">
                    ₹{item.productId.price.toFixed(2)} × {item.quantity}
                  </p>
                </div>

                <button
                  onClick={() => removeItem(item._id)}
                  className="text-red-500 hover:text-red-600 font-semibold"
                >
                  <FaTrash className="text-xl" />
                </button>
              </div>
            ))}

            {/* Total Price */}
            <div className="text-right pt-4 text-lg font-semibold text-gray-800">
              Total: ₹{totalPrice?.toFixed(2)}
            </div>

            {/* Place Order Button */}
            <div className="text-right mt-4">
              <button
                onClick={handlePlaceOrder}
                className={`bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-md transition 
                }`}
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
