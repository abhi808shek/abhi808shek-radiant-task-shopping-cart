import ProductCard from "@/components/product-card";
import { products } from "@/services/apis/products.api";
import { hideLoader, showLoader } from "@/store/global.reducer";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const ProductListing = () => {
  const [productList, setProductList] = useState([]);
  const dispatch = useDispatch();
  const onHandleProductList = async () => {
    try {
      dispatch(showLoader());
      const result = await products();
      setProductList(result?.data);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(hideLoader());
    }
  };

  useEffect(() => {
    onHandleProductList();
  }, []);
  return (
    <div className="w-full px-4 py-4">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
        Product Listing
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center">
        {productList.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductListing;
