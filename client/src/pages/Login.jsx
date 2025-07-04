import axios from '../utils/axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCurrentUser } from '../store/slice/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
      });
      const [loading,setLoading] = useState(false)
      const dispatch = useDispatch();
      const navigate = useNavigate();
 
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
          const res = await axios.post("/auth/login", formData);
          localStorage.setItem('token', res.data.token);
          dispatch(fetchCurrentUser());
          navigate("/home");
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
    
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-200 px-4">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
            <h2 className="text-3xl font-bold text-indigo-700 text-center mb-6">Login to Your Account</h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg transition-all shadow-md hover:shadow-lg focus:ring-2 focus:ring-indigo-500"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Log In"}
                </button>
              </div>
            </form>
    
            <p className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <a className="text-indigo-600 hover:underline font-semibold" onClick={()=>navigate("/signup")}>
                Sign up
              </a>
            </p>
          </div>
        </div>
      );
    };

export default Login