import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { customLocalStorage } from "@/utils/customLocalStorage";

// Define Order Type
type Order = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  status: "Arriving Today" | "Delivered" | `Delivered by ${string}`;
};

const OrderHistory: FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    const cartList = customLocalStorage.getData("orders");
    const parsedOrderedList: any[] = cartList ? JSON.parse(cartList) : [];
    setOrders(parsedOrderedList);
  }, []);
  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-start">
        Order History
      </h2>
      <div className="w-full max-w-4xl space-y-4">
        {orders.map((order) => (
          <Card
            key={order.id}
            className="p-4 flex flex-col sm:flex-row items-center justify-between bg-white shadow-md rounded-lg"
          >
            <div className="text-center sm:text-left">
              <p className="text-lg font-semibold text-gray-900">
                {order.title}
              </p>
              <p className="text-gray-600 mt-1">Quantity: {order.quantity}</p>
              <p className="text-lg font-semibold text-gray-900 mt-2">
                ${order.price}
              </p>
            </div>
            <div className="flex flex-col items-center sm:items-end">
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${
                  order.status === "Arriving Today"
                    ? "bg-yellow-200 text-yellow-800"
                    : order.status.startsWith("Delivered by")
                    ? "bg-blue-200 text-blue-800"
                    : "bg-green-200 text-green-800"
                }`}
              >
                {order.status}
              </span>
              <Button
                variant="outline"
                className="mt-2 text-red-500 border-red-500 hover:bg-red-100 cursor-pointer"
                onClick={() => {
                  toast.success("Coming soon");
                }}
              >
                View Details
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
