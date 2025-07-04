import axios from "../utils/axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const {user} = useSelector((state) => state.auth);
  const {cart} = useSelector((state) => state.cart);
  const navigate = useNavigate()

  const [address, setAddress] = useState("");

  const totalPrice = cart.reduce(
    (total, item) => total + item.productId.price * item.quantity,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!address) return;

    try {
      // Send order data (cart and address) to backend
      const response = await axios.post("/order/create", {
        cart,
        address,
      });

      if (response.status === 200) {
        await axios.delete('/cart/remove');
        setAddress("");
        navigate('/home')
        // Optionally: clear cart from Redux
        // dispatch(clearCart());
      }
    } catch (error) {
      console.error("Order submission failed:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-md mt-10">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6">Order Summary</h2>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">User Details</h3>
        {user ? (
          <ul className="text-gray-600 space-y-1">
            <li><strong>Name:</strong> {user.firstName}</li>
            <li><strong>Email:</strong> {user.email}</li>
          </ul>
        ) : (
          <p className="text-red-500">No user details found.</p>
        )}
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Cart Products</h3>
        {cart && cart.length > 0 ? (
          <ul className="space-y-2 text-gray-700">
            {cart?.map((item) => (
              <li key={item._id} className="border-b pb-2">
                {item.productId.name} — Qty: {item.quantity} — ₹{item.productId.price.toFixed(2)} each
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Your cart is empty.</p>
        )}
      </div>
      {cart && cart?.length > 0 && (
        <div className="text-right font-semibold text-gray-800 mb-4">
          Total: ₹{totalPrice.toFixed(2)}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="address" className="block font-medium text-gray-700 mb-1">
            Delivery Address
          </label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your delivery address"
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <button
          type="submit"
          disabled={!cart || cart.length === 0}
          className={`w-full bg-indigo-600 text-white py-2 rounded-md font-semibold transition hover:bg-indigo-700 ${
            (!cart || cart.length === 0) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Submit Order
        </button>
      </form>
    </div>
  );
};

export default Order;
