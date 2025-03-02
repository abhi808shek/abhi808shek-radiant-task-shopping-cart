import ProductCard from "@/components/product-card";
import { useAppSelector } from "@/hooks/reduxHook";
import { products } from "@/services/apis/products.api";
import { hideLoader, showLoader } from "@/store/global.reducer";
import { setProducts, setSearchResults } from "@/store/product.reducer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const ProductListing = () => {
  const { searchResults } = useAppSelector((state) => state.products);
  const dispatch = useDispatch();
  const onHandleProductList = async () => {
    try {
      dispatch(showLoader());
      const result = await products();
      dispatch(setProducts(result?.data));
      dispatch(setSearchResults(result?.data));
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
        {!searchResults.length ? (
          <div className="col-span-full flex flex-col items-center mt-10">
            <h2 className="text-2xl font-semibold text-gray-900">
              No Products Found
            </h2>
            <p className="text-gray-600 mt-2">
              Try adjusting your search or explore other categories.
            </p>
          </div>
        ) : (
          searchResults?.map((product: any, index) => (
            <ProductCard key={index} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default ProductListing;
