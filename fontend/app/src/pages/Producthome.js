import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Productpage = () => {
  const [loggedInUser, setLoggedInUser] = useState("Guest");
  const [productUser, setProductUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser') || "Guest";
    setLoggedInUser(user);
  }, []);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const api = "http://localhost:8000/products";
      const response = await fetch(api, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });
      const result = await response.json();
      setProductUser(result);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white p-4">
        <h2 className="text-xl mb-4">Hello, {loggedInUser}</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* Main Content Area */}
      <div className="w-3/4 p-6">
        <h1 className="text-2xl font-bold mb-6">Product List</h1>
        <div className="grid grid-cols-2 gap-4">
          {productUser.length > 0 ? (
            productUser.map((product, index) => (
              <div
                key={index}
                className="p-4 border border-gray-300 rounded-md shadow-lg"
              >
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-lg text-gray-700">Price: ${product.prize}</p>
              </div>
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Productpage;
