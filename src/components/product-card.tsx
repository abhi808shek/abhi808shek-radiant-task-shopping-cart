import { useAppDispatch } from "@/hooks/reduxHook";
import { setCart } from "@/store/cart.reducer";
import { customLocalStorage } from "@/utils/customLocalStorage";
import { MouseEvent } from "react";
import { Link } from "react-router-dom";

type PRODUCT_TYPE = {
  id: number;
  images: string[];
  description: string;
  price: number;
};

type PROP_TYPE = {
  product: PRODUCT_TYPE;
};
const ProductCard = ({ product }: PROP_TYPE) => {
  const dispatch = useAppDispatch();
  const addToCart = (
    event: MouseEvent<HTMLButtonElement>,
    product: PRODUCT_TYPE
  ) => {
    event.preventDefault();

    const cartData = customLocalStorage.getData("cart");
    const previousCartList: any[] = cartData ? JSON.parse(cartData) : [];

    if (!Array.isArray(previousCartList)) {
      console.error("Invalid cart data detected in localStorage.");
      return;
    }

    let isExist = false;
    const result = previousCartList.map((item) => {
      if (product.id === item.id) {
        isExist = true;
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    const updatedCart = isExist
      ? result
      : [...result, { ...product, quantity: 1 }];

    customLocalStorage.setData("cart", JSON.stringify(updatedCart));
    dispatch(setCart(updatedCart));
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md p-4 relative">
      <Link to={`${product.id}`}>
        <img
          className="w-full h-48 object-contain p-4 rounded-t-lg"
          src={product.images[0]}
          alt="Apple Watch"
        />

        <div className="px-5 pb-5">
          <h5 className="text-md font-semibold tracking-tight text-gray-900">
            {product.description.slice(0, 100)}...
          </h5>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-gray-900">
              ${product.price}
            </span>
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={(event) => addToCart(event, product)}
            >
              Add to cart
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
