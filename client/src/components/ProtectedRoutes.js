import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const user = useSelector((state) => state.user.user);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
