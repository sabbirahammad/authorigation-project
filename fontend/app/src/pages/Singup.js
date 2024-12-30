import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Assuming you are using React Router for navigation
import { handleerror, handlesuccess } from '../utilits';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = formData;
    
    if (!name || !email || !password) {
      return handleerror("Name, email, and password are required");
    }

    try {
      const api = "http://localhost:8000/auth/signup";
      const response = await fetch(api, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      const { success, message } = result;

      if (success) {
        handlesuccess(message);
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      }
       else {
        handleerror(message);
      }

    } catch (error) {
      handleerror(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400">
      <div className="
        bg-gradient-to-r from-blue-500 to-purple-600
        p-1
        rounded-lg 
        shadow-lg 
        w-full 
        max-w-md 
        transform 
        transition-transform 
        duration-300 
        hover:scale-105
        hover:bg-gradient-to-l hover:from-purple-600 hover:to-blue-500
      ">
        <div className="bg-white rounded-lg p-8 md:p-12">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-700">Signup</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-600 font-medium mb-2" htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 font-medium mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-600 font-medium mb-2" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Place ToastContainer at the bottom of the main content */}
      <ToastContainer />
    </div>
  );
};

export default Signup;


