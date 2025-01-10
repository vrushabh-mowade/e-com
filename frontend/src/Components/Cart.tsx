import { useGetcartitems } from "../hooks/Cart"
import {CartItem } from "./CartItem"
import {jwtDecode} from "jwt-decode";

export const Cart = () => {
    const wholeToken = localStorage.getItem("token");
    const token = wholeToken?.split(" ")[1];
    
        if (!token) {
        throw new Error("Token not found");
        }
        const decoded = jwtDecode<{ id: string }>(token);
        const userId = decoded.id;

    const {cartData , loading ,error} = useGetcartitems(userId || "");

    if(!loading){
        return(<>
        <div>loading the cart items ....</div>
        </>)
    }

    if(error){
        console.log("the error is " ,error);
    }

    cartData?.cartItems.forEach(cartItem => {
        const items = cartItem.items;
        items.forEach( item => {
            console.log(`product id ${item.productId} has main image as  `,item.product.mainImage);
        })
    });
    
return (
    <div className="">
        <div className="flex flex-col items-center">
            {cartData?.cartItems.map(cartItem => (
                <div key={cartItem.id} className="mb-5">
                    {cartItem.items.map(item => (
                        <CartItem
                            manufacturer={item.product.manufacturer}
                            title={item.product.title}
                            mainImage={item.product.mainImage}
                            price={item.product.price}
                            
                        />
                    ))}
                </div>
            ))}
        </div>
        <div>hii</div>
    </div>
)
}






