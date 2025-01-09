import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute({ isLoggedIn }) {
  if (!isLoggedIn) {
    return <Navigate to="/home/login" />;
  }
  return <Outlet />;
}

export default PrivateRoute;
