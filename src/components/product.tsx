import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // If using React Router
import { Button } from "@/components/ui/button"; // ShadCN UI (or replace with <button>)
import { Card } from "@/components/ui/card";
import { productbyId } from "@/services/apis/products.api";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);

  const onHandleProductListById = async () => {
    const result = await productbyId(Number(id));
    setProduct(result?.data);
  };
  useEffect(() => {
    onHandleProductListById();
  }, []);

  if (!product)
    return <p className="text-center mt-10">Loading product details...</p>;

  return (
    <div
      className="flex justify-center items-center bg-gray-100 px-4"
      style={{ height: "calc(100dvh - 68px)" }}
    >
      <Card className="w-full max-w-3xl p-6 shadow-lg rounded-lg bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="flex justify-center">
            <img
              src={product.images[0]}
              className="w-full h-auto max-h-96 object-cover rounded-md"
            />
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                {product.title}
              </h2>
              <p className="text-gray-600 mt-2">{product.description}</p>
              <p className="text-xl font-bold mt-4 text-blue-600">
                ${product.price}
              </p>
            </div>

            <Button className="w-full mt-6 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
              Add to Cart
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductDetail;
