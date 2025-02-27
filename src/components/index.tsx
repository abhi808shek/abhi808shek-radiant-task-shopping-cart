import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, LogOut, Search, Menu, Box } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { customLocalStorage } from "@/utils/customLocalStorage";
import { searchOrders } from "@/utils/customSearch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { setSearchResults } from "@/store/product.reducer";

const Navbar = () => {
  const navigate = useNavigate();
  const { cart } = useAppSelector((state) => state.cart);
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { productsList } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  // Handle Logout
  const handleLogout = () => {
    customLocalStorage.deleteData("token");
    navigate("/login");
  };
  return (
    <nav className="flex items-center justify-between bg-white p-4 shadow-md fixed top-0 w-full z-10">
      {/* Left - Logo */}
      <Link to="/" className="text-xl font-bold text-gray-900">
        Radiant Infonet
      </Link>

      {/* Center - Search Input */}
      <div className="hidden md:block relative w-full max-w-md md:w-1/3">
        <Input
          type="text"
          placeholder="Search products..."
          className="w-full rounded-lg border p-2 pl-10 text-gray-900"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            const result: any = searchOrders(productsList, e.target.value);
            dispatch(setSearchResults(result));
          }}
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
      </div>

      {/* Right - Icons */}
      <div className="flex items-center gap-4">
        <TooltipProvider>
          {/* Orders Icon */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/orders" className="relative">
                <Box className="h-6 w-6 text-gray-700 hover:text-gray-500" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>Orders</TooltipContent>
          </Tooltip>

          {/* Cart Icon */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/cart" className="relative">
                <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-gray-500" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Link>
            </TooltipTrigger>
            <TooltipContent>Cart</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* User Profile Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="rounded-full p-2">
              <User className="h-6 w-6 text-gray-700" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-40 p-2 shadow-lg bg-white border rounded-lg">
            <Button
              variant="ghost"
              className="w-full flex items-center gap-2 text-gray-900"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              Logout
            </Button>
          </PopoverContent>
        </Popover>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="block md:hidden"
        >
          <Menu className="h-6 w-6 text-gray-700" />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-14 left-0 w-full bg-white shadow-md md:hidden flex flex-col items-center gap-4 p-4 z-10">
          <div className="relative w-full">
            <Input
              type="text"
              placeholder="Search products..."
              className="w-full rounded-lg border p-2 pl-10 text-gray-900"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
          </div>

          <Button
            variant="ghost"
            className="w-full flex items-center gap-2 text-gray-900"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
