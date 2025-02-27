import Navbar from "@/components";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex flex-col w-full h-[100dvh]">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
