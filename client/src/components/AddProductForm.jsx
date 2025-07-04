import { useDispatch } from 'react-redux';
import axios from '../utils/axios';
import React, { useState } from 'react';
import { fetchProducts } from '../store/slice/productSlice';
import toast from 'react-hot-toast';

const AddProductForm = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    quantity: '',
    image: ''
  });

  const dispatch = useDispatch()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = axios.post('/product/create',product)
    dispatch(fetchProducts())
    toast.success("Product added successfully")
    setProduct({ name: '', price: '', quantity: '', image: '' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={product.name}
              onChange={handleChange}
              required
              placeholder="Product name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-gray-700 font-medium mb-1">
              Price (₹)
            </label>
            <input
              type="number"
              name="price"
              id="price"
              value={product.price}
              onChange={handleChange}
              required
              placeholder="Price"
              min="0"
              step="0.01"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="quantity" className="block text-gray-700 font-medium mb-1">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              value={product.quantity}
              onChange={handleChange}
              required
              placeholder="Quantity"
              min="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-gray-700 font-medium mb-1">
              Image URL
            </label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const fileReader = new FileReader();
                  fileReader.readAsDataURL(file);
                  fileReader.onload = () => {
                    setProduct((prev) => ({
                      ...prev,
                      image: fileReader.result,
                    }));
                  };
                }
              }}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
