import React, { useEffect, useRef, useState } from 'react';
import { FiUser, FiShoppingCart, FiHome } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slice/authSlice';
import { useNavigate } from 'react-router-dom';

const Navbar = ({search, setSearch}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setShowDropdown(false);
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // You can dispatch or navigate with search query
    console.log('Search:', search);
    // navigate(`/search?q=${search}`);
  };

  return (
    <nav className="bg-white shadow-md px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left: Home + Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 w-full sm:w-auto">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/home')}>
            <FiHome className="text-indigo-600 text-2xl" />
            <span className="text-xl font-bold text-indigo-700">Home</span>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mt-3 sm:mt-0">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full sm:w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </form>
        </div>

        {/* Right: Icons and Buttons */}
        <div className="flex items-center space-x-6">
          {/* User Icon & Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              className="relative group hover:text-indigo-600 transition"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              <FiUser className="text-xl" />
              <span className="sr-only">User</span>
            </button>
            {showDropdown && user && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
                <div className="px-4 py-2 text-gray-700 border-b">{user.firstName}</div>
                <button
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Admin: Add Product */}
          {user && user.role === 'admin' ? (
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
              onClick={() => navigate('/add-product')}
            >
              Add Product
            </button>
          ) : (
            // Cart Icon
            <button
              className="relative group hover:text-indigo-600 transition"
              onClick={() => navigate('/cart')}
            >
              <FiShoppingCart className="text-xl" />
              <span className="sr-only">Cart</span>
              {cart?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {cart.length}
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
