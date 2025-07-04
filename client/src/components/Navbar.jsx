import React from 'react';
import { FiUser, FiShoppingCart, FiHome } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slice/authSlice';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth);
  const {cart} = useSelector((state)=>state.cart)
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate()

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
    navigate('/')
  };

  return (
    <nav className="bg-white shadow-md px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2" onClick={()=>navigate('/home')}>
          <FiHome className="text-indigo-600 text-2xl" />
          <span className="text-xl font-bold text-indigo-700">Home</span>
        </div>

        <div className="flex items-center space-x-6">
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

          {user && user.role === 'admin' ? (
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
              onClick={() => navigate('/add-product')}
            >
              Add Product
            </button>
          ) : (
            <button className="relative group hover:text-indigo-600 transition" onClick={()=>{
              navigate("/cart")
            }}>
              <FiShoppingCart className="text-xl"  />
              <span className="sr-only">Cart</span>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                {cart?.length}
              </span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
