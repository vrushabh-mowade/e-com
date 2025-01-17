import { Link } from "react-router";
import { useGetcartitems } from "../hooks/Cart";
import { CartItem } from "./CartItem";
import { jwtDecode } from "jwt-decode";
import { useCallback } from "react";


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
  
  const refreshCartData = useCallback(async () => {
    try {
      const { cartData: refreshedData } = await useGetcartitems(userId);
      setCartData(refreshedData);
    } catch (err) {
      console.error("Error refreshing cart data:", err);
    }
  }, [userId]);
  

  if (!loading) {
    return (
      <>
        <div>loading the cart items ....</div>
      </>
    );
  }

  if (error) {
    console.log("the error is ", error);
  }
  let total = 0;

  cartData?.cartItems.forEach((cartItem) => {
    const items = cartItem.items;
    items.forEach((item) => {
      console.log(
        `product id ${item.productId} has main image as  `,
        item.product.mainImage
      );
      total = total + parseInt(item.product.price)*(item.quantity);
    });
  });

  console.log(total);

  return (
    <div className="flex justify-center">
      <div className="grid grid-flow-col auto-cols-max">
        <div  className="flex flex-col items-center">
          {cartData?.cartItems.map((cartItem) => (
            <div key={cartItem.id} className="mb-5">
              {cartItem.items.map((item) => (
                <CartItem
                  key={item.productId}
                  manufacturer={item.product.manufacturer}
                  title={item.product.title}
                  mainImage={item.product.mainImage}
                  price={item.product.price}
                  cartItemId={item.id}
                  onDelete={() => useGetcartitems(userId)}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="flex flex-col">
          <div className="w-[300px] h-[250px] shadow-md bg-[#FAFAFA] flex flex-col justify-between ">
            <div className="p-4">
              <div className="text-base font-semibold font-serif text-zinc-600">
                Order details
              </div>

              <div className="p-1 text-xs font-sans font-light">
                <div className="flex justify-between p-1">
                  <div>Bag mrp</div>
                  <div className=""> 12000</div>
                </div>

                <div className="flex justify-between p-1">
                  <div>Platform fees</div>
                  <div> 12</div>
                </div>
              </div>
              
              <div className="flex justify-between p-1 text-sm font-sans font-light">
                <div>Total price</div>
                <div> {total}</div>
              </div>
            </div>
            <div className="w-full flex items-center justify-center bg-[#866528] p-4 text-white text-sm">
              <Link to={"/shipping"}>
                <button className="bg-transparent text-white border-none cursor-pointer">
                  PROCEED TO PURCHASE
                </button>
              </Link>
            </div>

          </div>
          <div>hii</div>
        </div>
      </div>
    </div>
  );
};
