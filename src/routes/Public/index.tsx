import { Navigate, Outlet } from "react-router-dom";
import { customLocalStorage } from "@/utils/customLocalStorage";

const PublicRoutes = () => {
  const token = customLocalStorage.getData("token");

  const isUserAuthenticated = !!token;

  return isUserAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoutes;
