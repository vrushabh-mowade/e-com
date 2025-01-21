import { RatingTag } from "../SubComponent/RatingTag";
import ProductDetailToggle from "../Components/ProductDetailToggle";
import { Product } from "../Pages/ProductPage";
import { useGetWishlistdetails } from "../hooks/Wishlist";
import {useUploadToCart} from '../hooks/Cart'
import { usecartitemcheck } from "../hooks/Cart";
import { BACKEND_URL } from "../config";
import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router";

export interface ProductResponse {
  product: {
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
  msg: string;
}

const DetailedProductInfo = ({productDetails}: { productDetails: Product | null}) => {
  const productId = productDetails?.id;

  if (!productId) {
    return <>Product ID is not fetched properly</>;
  }
  const wholeToken = localStorage.getItem("token");
  const token = wholeToken?.split(" ")[1];

  if (!token) {
    throw new Error("Token not found");
  }
  const decoded = jwtDecode<{ id: string }>(token);
  const userId = decoded.id;
  
  const [quantity ,setquantity] = useState< number>(1);
  const { inwishlist, loading, error } = useGetWishlistdetails(productId,userId);
  const [isInWishlist, setIsInWishlist] = useState<boolean | null>(inwishlist);
  const {isincart,cartId,loading: cartloading,error: carterror,} = usecartitemcheck(userId, productId);
  const [isIncart ,setisIncart] = useState(isincart);
  const {uploadToCart , error : uploaderror ,loading :uploadloading} = useUploadToCart();


useEffect(() => {
  if (isincart !== undefined && isincart !== null) {
    setisIncart(isincart);
  }
}, [isincart]); 

  useEffect(() => {
    if (!loading && inwishlist !== null) {
      setIsInWishlist(inwishlist);
    }
  }, [loading, inwishlist]);

  
  const toggleWishlist = async () => {
    try {
      if (isInWishlist) {
        // Remove from wishlist
        await axios.delete(`${BACKEND_URL}/wishlist/${userId}/${productId}`, {
          data: { productId, userId },
        });
        setIsInWishlist(false);
      } else {
        // Add to wishlist
        await axios.post(`${BACKEND_URL}/wishlist`, { productId, userId });
        setIsInWishlist(true);
      }
    } catch (err) {
      console.error("Error toggling wishlist:", err);
    }
  };

  const addToCart = async () => {
    try {
      await uploadToCart(cartId, productId, quantity);
      setisIncart(true);
    } catch (err) {
      console.error("Error uploading the data to cartitem:", err);
    }
  };
  if (!productDetails) {
    return <>product details not fetched</>;
  }

  console.log(productDetails.manufacturer);
  if (loading || cartloading ) {
    return <>Loading the wishlist state...</>;
  }

  if (error || carterror) {
    console.error("Error fetching wishlist state:", error);
    return <>Error loading wishlist state</>
  }
  return (
    <div>
      <div className="w-80  bg-white">
        <div className="flex flex-col items-center justify-center ">
          <div className="font-light text-lg text-yellow-600">
            {productDetails.manufacturer}
          </div>
          <div className="font-normal text-md not-italic text-zinc-600">
            {productDetails.title}
          </div>
          <div className="flex items-center justify-center p-4 gap-2">
            <RatingTag rate={productDetails.rating} />
            <span className="proportional-nums text-zinc-600 text-sm">
              315 Rating
            </span>
          </div>
          <div className="flex  items-center font-light text-2xl text-[#353535] p-2">
            <div className="flex items-center justify-center">
              <div className="pt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  width="15"
                  height="20"
                >
                  <text
                    className="font-normal"
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontFamily="Arial, sans-serif"
                    fontSize="70"
                    fill="#353535"
                  >
                    ₹
                  </text>
                </svg>
              </div>
              <span>{productDetails.price} </span>
            </div>
          </div>
          <div id="discountdetils" className="flex">
            <div id=""></div>
            <div id="" className="text-xs text-zinc-600 ">
              price inclusive of all taxes
            </div>
          </div>
          <div className="flex">
            <div> quantity </div>
            <input onChange={(e)=>{setquantity(parseInt(e.target.value))}} type="number"></input>
          </div>
          
          {isIncart ? (
            <>
              <button className="w-full pt-20">
                <Link to={`/cart/${userId}`}>
                  <div>
                    <div className="group/Cartbutton  bg-[#866528] border border-2 border-[#866528] ">
                      <div className=" flex items-center justify-center border border-1 border-[#866528] group-hover/Cartbutton:border-white py-1">
                        <span className="flex items-center justify-center gap-3">
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="white"
                              className="size-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                              />
                            </svg>
                          </div>
                          <div className="text-md text-white font-sans font-extralight">
                            Go to Bag
                          </div>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </button>
            </>
          ) : (
            <>
              <button onClick={addToCart} className="w-full pt-20">
                <div>
                  <div className="group/Cartbutton  bg-[#866528] border border-2 border-[#866528] ">
                    <div className=" flex items-center justify-center border border-1 border-[#866528] group-hover/Cartbutton:border-white py-1">
                      <span className="flex items-center justify-center gap-3">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="white"
                            className="size-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                            />
                          </svg>
                        </div>
                        <div className="text-md text-white font-sans font-extralight">
                          ADD TO CART
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            </>
          )}

          <button onClick={toggleWishlist} className="w-full pt-8">
            <div className="">
              <div className=" group/Cartbutton bg-white border border-1 border-white outline outline-offset-0 outline-1 outline-[#866528] ">
                <div className="flex items-center justify-center border border-1 border-white group-hover/Cartbutton:border-[#866528]  py-1">
                  {isInWishlist ? (
                    <>
                      <span className="flex items-center justify-center gap-3">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#866528"
                            viewBox="0 0 24 24"
                            strokeWidth="1"
                            stroke="#866528"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                            />
                          </svg>
                        </div>
                        <div className="text-md text-[#866528] font-sans font-extralight">
                          remove from Wishlist
                        </div>
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="flex items-center justify-center gap-3">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1"
                            stroke="#866528"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                            />
                          </svg>
                        </div>
                        <div className="text-md text-[#866528] font-sans font-extralight">
                          save to wishlist
                        </div>
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </button>
          <div className="pt-10">
            <ProductDetailToggle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedProductInfo;
