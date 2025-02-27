import Navbar from "@/components";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex flex-col w-full h-[100dvh]">
      <Navbar />
      <div className="relative top-[90px] md:top-[65px] ">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
