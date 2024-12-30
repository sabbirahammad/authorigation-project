import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handlesuccess } from '../utilits';

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [productUser, setProductUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const item = localStorage.getItem('loggedInUser');
    setLoggedInUser(item || 'Guest');
  }, []);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    setLoading(true); // Start loading
    try {
      const api = 'http://localhost:8000/products';
      const response = await fetch(api, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setProductUser(result);
    } catch (error) {
      console.error('Error fetching products:', error.message);
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handlesuccess('User logged out');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <div>
      <h1>Welcome, {loggedInUser}</h1>

      {loading ? (
        <p>Loading products...</p>
      ) : productUser.length > 0 ? (
        <div>
          {productUser.map((item) => {
            const { id, name, prize } = item; // Assuming `id` is unique
            return (
              <ul key={id}>
                <li>
                  {name}: {prize}
                </li>
              </ul>
            );
          })}
        </div>
      ) : (
        <p>No products available.</p>
      )}

      <div>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
};

export default Home;
