import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const RefreshHandler = ({ setIsAuthenticated }) => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            // Redirect authenticated users away from login/signup pages
            if (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup') {
                navigate('/home', { replace: true });  // Use replace to avoid adding history entries
            }
        } else {
            setIsAuthenticated(false); // Optionally handle unauthenticated state
        }
    }, [location, navigate, setIsAuthenticated]);

    return null;  // No rendering needed, this component serves as a side effect
};

export default RefreshHandler;

