import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { handleerror, handlesuccess } from '../utilits';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate=useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log(formData);
    const{email,password}=formData;
    if(!email||!password){
        return handleerror("Email and password are requred!");
    }
    try {
        const api="http://localhost:8000/auth/login";
        const response=await fetch(api,{
            method:"POST",
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(formData)
        })
        const result=await response.json();
        const {success,message,name,jwttoken,error}=result;
        if(success){
            handlesuccess(message);
            localStorage.setItem('token',jwttoken);
            localStorage.setItem('loggedInUser',name)
            setTimeout(() => {
                navigate("/home");
            }, 1000);
        }
        else if(error){
            const details=error?.details[0].message;
            handleerror(details);
        }
        else{
            handleerror(message);
        }
    } catch (error) {
        handleerror(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400">
      <div className="bg-white p-8 shadow-md rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Sing in</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/forgot-password" className="text-blue-500 hover:underline">
            Forgot Password?
          </Link>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-700">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signin;
