import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { setCart } from "@/store/cart.reducer";
import { customLocalStorage } from "@/utils/customLocalStorage";
import { Minus, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { cart } = useAppSelector((state) => state.cart);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Update Quantity
  const updateQuantity = (id: number, amount: number) => {
    const updatedCart: any[] = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + amount) }
        : item
    );
    dispatch(setCart(updatedCart));
    customLocalStorage.setData("cart", JSON.stringify(updatedCart));
  };

  // Remove Item
  const removeItem = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    dispatch(setCart(updatedCart));
    customLocalStorage.setData("cart", JSON.stringify(updatedCart));
  };

  // Calculate Total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    const cartList = customLocalStorage.getData("cart");
    const parsedCartList: any[] = cartList ? JSON.parse(cartList) : [];
    dispatch(setCart(parsedCartList));
  }, []);

  const handleCheckout = () => {
    setTimeout(() => {
      setIsModalOpen(true);
    }, 3000);
  };

  // Close Modal & Navigate
  const closeModalAndNavigate = () => {
    setIsModalOpen(false);
    dispatch(setCart([]));
    customLocalStorage.setData("cart", JSON.stringify([]));
    navigate("/orders");
  };

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      {cart.length === 0 ? (
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            Your Cart is Empty
          </h2>
          <p className="text-gray-600 mt-2">
            Add some items to your cart to see them here.
          </p>
          <Button
            className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg cursor-pointer"
            onClick={() => navigate("/")}
          >
            Continue to buy
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card
                key={item.id}
                className="p-4 flex flex-col sm:flex-row items-center justify-between bg-white shadow-md"
              >
                <div className="text-center sm:text-left">
                  <p className="text-lg font-semibold text-gray-900">
                    {item.title}
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 flex items-center gap-1 mt-2 sm:mt-0 cursor-pointer"
                  >
                    <Trash className="h-4 w-4" /> Remove
                  </button>
                </div>
                <div className="flex items-center gap-4 mt-4 sm:mt-0">
                  <Button
                    variant="outline"
                    className={` ${
                      item.quantity > 1
                        ? "cursor-pointer"
                        : "cursor-not-allowed"
                    }`}
                    onClick={() => updateQuantity(item.id, -1)}
                    disabled={item.quantity === 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-lg">{item.quantity}</span>
                  <Button
                    variant="outline"
                    className="cursor-pointer"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <p className="text-lg font-semibold text-gray-900">
                    ${item.price * item.quantity}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <Card className="p-4 bg-white shadow-md">
            <h3 className="text-xl font-semibold text-gray-900">
              Order Summary
            </h3>
            <div className="mt-4 space-y-2 text-gray-700">
              <p className="flex justify-between">
                <span>Original Price:</span> <span>${total}</span>
              </p>
            </div>
            <hr className="my-4" />
            <p className="flex justify-between text-xl font-semibold">
              <span>Total:</span> <span>${total}</span>
            </p>
            <Button
              className="w-full mt-4 bg-blue-600 text-white cursor-pointer"
              onClick={handleCheckout}
            >
              Buy now
            </Button>
          </Card>
        </div>
      )}

      {/* Order Success Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-30 backdrop-blur-md">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-96">
            <h2 className="text-2xl font-semibold text-gray-900">
              Order Placed Successfully
            </h2>
            <p className="text-gray-600 mt-2">Thank you for your purchase!</p>
            <Button
              className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg cursor-pointer"
              onClick={closeModalAndNavigate}
            >
              OK
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
