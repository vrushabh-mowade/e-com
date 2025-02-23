import { useGetcartitems } from "../hooks/Cart";
import { CartItem } from "./CartItem";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import OrdersectionSummary from "./OrdersectionSummary";

type Product = {
  manufacturer: string;
  title: string;
  mainImage: string;
  price: string;
};

export type CartItemType = {
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
        <OrdersectionSummary total={total}/>
        
      </div>
    </div>
  );
};
