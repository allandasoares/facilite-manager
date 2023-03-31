import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
  const token = localStorage.getItem('token');
  let auth = true; // determine if authorized, from context or however you're doing it

  if (!token) auth = false;

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes; // Export as default
