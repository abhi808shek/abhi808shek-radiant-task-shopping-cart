type Order = {
  id: number;
  title: string;
  price: number;
  quantity: number;
};
export const searchOrders = (orders: Order[], query: string): Order[] => {
  if (!query.trim()) return orders;

  const lowerCaseQuery = query.toLowerCase();

  return orders.filter(
    (order) =>
      order.title.toLowerCase().includes(lowerCaseQuery) ||
      order.price.toString() === query
  );
};
