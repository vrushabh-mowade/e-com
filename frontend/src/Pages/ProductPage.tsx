import ImageComponent from "../Components/ImageComponent";
import DetailedProductInfo from "../Components/DetailedProductInfo";
import { useNavigate, useParams } from "react-router";
import { useGetProductdetails, useGetProductImages } from "../hooks/products";
import { useState, useEffect } from "react";



export interface Product {
  id: string;
  slug: string;
  title: string;
  mainImage: string;
  price: number;
  rating: number;
  description: string;
  manufacturer: string;
  inStock: number;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
};

const ProductPage = () => {
  const { id } = useParams();
  const { details } = useGetProductdetails(id || "");
  const { imageData } = useGetProductImages(id || "");
  
  const [productDetails, setProductDetails] = useState<Product| null>(null);
  const [Imagearray, setImagearray] = useState<string[] | null>(null);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    if (details) {
      setProductDetails(details?.product);
    }
  }, [details,id]);

  useEffect(() => {
    if (imageData) {
      setImagearray(imageData.images);
    }
  }, [details,id]);

  if (!Imagearray) {
    console.warn("images are loading:", { details,imageData });
    return <div>Loading product images...</div>;
  }
  if (!details) {
    console.warn("Details are loading:", { details,imageData });
    return <div>Loading product details ...</div>;
  }

  if (!productDetails) {
    return <div>Loading...</div>;
  }

  console.log("the image array is",Imagearray );
  console.log("the image array from product page is",Imagearray[4]);
  return (
    <>
      <div>
        <div>
          <div className="grid grid-flow-col auto-cols-max flex justify-center w-full h-full">
            <div className="w-[797px] bg-red-200 grid grid-flow-col auto-cols-max">
              <div>
                <ImageComponent Imagearray={Imagearray} />
              </div>
            </div>

            {/* Product details */}
            <div id="productdetails" className="w-[403px] bg-green-200 flex justify-center">
              <DetailedProductInfo productDetails={productDetails}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
