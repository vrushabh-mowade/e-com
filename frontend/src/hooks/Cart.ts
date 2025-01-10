import axios from "axios";
import { useState ,useEffect } from "react";
import { BACKEND_URL } from "../config";
import { ProductProps } from "../Components/Productcard";

interface CartApiResponse {
    msg: string;
    cartItems: CartItem[];
}

interface CartItem {
    id: string;
    userId: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    items: Item[];
}

interface Item {
    id: string;
    cartId: string;
    productId: string;
    quantity: number;
    product: ProductProps;
}

export const useGetcartitems = (userId :string) :{cartData : CartApiResponse | null, loading: boolean, error: Error | null} =>{
    const [cartData ,setcartData] = useState<CartApiResponse | null>(null);
    const [error, setError] = useState<Error | null>(null); 
    const [loading, setLoading] = useState<boolean>(true);


    const fetchcartData = async () => {
    try {
        console.log("USER ID is" ,userId);
        setLoading(true); 
        setError(null); 
        const response = await axios.get(`${BACKEND_URL}/allcartoption/${userId}`,{
        headers : {
            Authorization : localStorage.getItem("token")
        }
    });
        setcartData(response.data || null);
        console.log("API response data is 1" ,response.data); 
    } catch (err) {
        console.error("Error fetching product details:", err);
        setError(err as Error); 
        setLoading(false); 
    }

    };

    useEffect(()=>{
        fetchcartData();
    },[userId]);

    return {cartData ,error ,loading}
}



