import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const AdminRoutes = () => {
  const user = useSelector((state) => state.user.user);
  if (user.role !== "admin") {
    console.log(user.role);
    return <Navigate to="/menu" />;
  }
  return <Outlet />;
};

export default AdminRoutes;
