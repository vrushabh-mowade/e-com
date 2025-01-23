import { Link } from "react-router";
import { useGetcartitems } from "../hooks/Cart";
import { CartItem } from "./CartItem";
import { SkeletonCartItem } from "./Skeletons/SkeletonCartItem"; // Import Skeleton
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";

type Product = {
  manufacturer: string;
  title: string;
  mainImage: string;
  price: string;
};

type CartItemDetails = {
  productId: string;
  product: Product;
  quantity: number;
};

type CartItemType = {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  product: Product;
};

export const Cart = () => {
  const wholeToken = localStorage.getItem("token");
  const token = wholeToken?.split(" ")[1];

  if (!token) {
    throw new Error("Token not found");
  }

  const decoded = jwtDecode<{ id: string }>(token);
  const userId = decoded.id;
  localStorage.setItem("userId", userId);
  
  

  const { cartData, loading, error } = useGetcartitems(userId || "");
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  // Update cartItems state when cartData is fetched
  useEffect(() => {
    if (cartData?.cartItems) {
      setCartItems(cartData.cartItems);
    }
  }, [cartData]);

  if (error) {
    console.error("Error fetching cart items:", error);
    return <div>Error fetching cart items. Please try again later.</div>;
  }

  let total = 0;

  cartItems.forEach((item) => {
    const quantity = item.quantity;
    const price = parseInt(item.product.price, 10); // Convert price to a number
    total += price * quantity;
  });


  return (
    <div className="flex justify-center ">
      <div className="grid grid-flow-col auto-cols-max gap-2 w-[1210px]">
        {/* Cart Items Section */}
        <div className="flex flex-col items-center">
          {
            // Render Cart Items once loaded
            cartItems.map((cartItem) => (
              <div key={cartItem.productId} className="mb-5">
                <CartItem
                  key={cartItem.productId}
                  manufacturer={cartItem.product.manufacturer || "Unknown"}
                  title={cartItem.product.title}
                  mainImage={cartItem.product.mainImage}
                  price={cartItem.product.price}
                  cartItemId={cartItem.id}
                />
              </div>
            ))
          }
        </div>

        {/* Order Summary Section */}
        <div className="flex flex-col">
          <div className="w-[300px] h-[250px] shadow-md bg-[#FAFAFA] flex flex-col justify-between">
            <div className="p-4">
              <div className="text-base font-semibold font-serif text-zinc-600">
                Order Details
              </div>
              <div className="p-1 text-xs font-sans font-light">
                <div className="flex justify-between p-1">
                  <div>Bag MRP</div>
                  <div>₹ {total}</div>
                </div>
                <div className="flex justify-between p-1">
                  <div>Platform Fees</div>
                  <div>₹ 12</div>
                </div>
              </div>
              <div className="flex justify-between p-1 text-sm font-sans font-light">
                <div>Total Price</div>
                <div>₹ {total + 12}</div>
              </div>
            </div>
            <div className="w-full flex items-center justify-center bg-[#866528] p-4 text-white text-sm">
              <Link to="/shipping">
                <button className="bg-transparent text-white border-none cursor-pointer">
                  PROCEED TO PURCHASE
                </button>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
