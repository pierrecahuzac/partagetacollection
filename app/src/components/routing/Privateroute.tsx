import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

const PrivateRoute = () => {
    const { isConnected } = useAuth();
    // console.log(isConnected);   
    if (!isConnected) {
        return <Navigate to="/signin" replace />;
    }
    return <Outlet />;
};

export default PrivateRoute;