
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Signin from './pages/Signin';
import Singup from './pages/Singup';
import Home1 from './pages/Home1'
import Home from './pages/Home';
import RefreshHandler from './RefreshHandler';
import Productpage from './pages/Producthome';

function App() {
  const [isAuthonticated, setIsAuthenticated] = useState(false);
  const PrivetRouter=({element})=>{
    return isAuthonticated? element:<Navigate to="/login"/>
  }
  return (
    <div>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
      <Routes>
        <Route path='/' element={<Navigate to="/login"/>}/>
        <Route path='/login' element={<Signin/>}/>
        <Route path='/signup' element={<Singup/>}/>
        <Route path='/home'element={<PrivetRouter element={<Home/>}/>}/>
        <Route path='/product' element={<Productpage/>}/>
        <Route path='/fb' element={<Home1/>}/>
      </Routes>
    </div>
  );
}

export default App;
