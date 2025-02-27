import MainLayout from "@/layouts/MainLayout";
import Cart from "@/pages/Cart";
import ProductListing from "@/pages/ProductListing";
import { Route, Routes } from "react-router";
import PrivateRoutes from "./Private";
import Login from "@/pages/Login";
import PublicRoutes from "./Public";
import ProductDetail from "@/components/product";
import OrderHistory from "@/pages/OrderHistory";

const Routing = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicRoutes />}>
        <Route path={"/login"} element={<Login />} />
      </Route>

      {/* Private Routes */}
      <Route element={<PrivateRoutes />}>
        <Route element={<MainLayout />}>
          <Route path={"/"} element={<ProductListing />} />
          <Route path={"/:id"} element={<ProductDetail />} />
          <Route path={"/cart"} element={<Cart />} />
          <Route path={"/orders"} element={<OrderHistory />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Routing;
