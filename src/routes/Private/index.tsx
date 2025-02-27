import { Navigate, Outlet } from "react-router-dom";
import { customLocalStorage } from "@/utils/customLocalStorage";

const PrivateRoutes = () => {
  const token = customLocalStorage.getData("token");

  const isUserAuthenticated = !!token;

  return isUserAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
