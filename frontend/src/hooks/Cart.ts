import axios from "axios";
import { useState ,useEffect } from "react";
import { BACKEND_URL } from "../config";
import { ProductProps } from "../Components/Productcard";


export interface CartApiResponse {
    msg: string;
    cartItems: CartItem[];
}

// interface CartItem {
//     id: string;
//     userId: string;
//     createdAt: string; 
//     updatedAt: string;
//     items: Item[];
// }

// interface Item {
//     id: string;
//     cartId: string;
//     productId: string;
//     quantity: number;
//     product: ProductProps;
// }


interface CartItem {
    id: string;
    cartId: string; 
    productId: string;
    quantity: number; 
    product: ProductProps; 
}



//get the cart items here using userid and return the whole data
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
        console.log("API response data from new 1",response.data); 
    } catch (err) {
        console.error("Error fetching product details:", err);
        setError(err as Error); 
        setLoading(false); 
    }
    };
    useEffect(()=>{
        fetchcartData();
    },[userId,]);
    return {cartData ,error ,loading}
}




//post the productid and get the status weather a product is in the cart or not 
export const usecartitemcheck = ( userId: string , productId: string): { isincart: boolean | null; cartId : string | null ;loading: boolean; error: Error | null } => {
    const [isincart, setisincart] = useState<boolean | null>(null);
    const [cartId, setcartId] = useState<string | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const fetchcartStatus = async () => {
        try {
            console.log("USER ID:", userId);
            console.log("PRODUCT ID:", productId);
            setLoading(true);
            setError(null);
            const response = await axios.post(
                `${BACKEND_URL}/allcartoption/check/${userId}`,
                { productId }, 
                {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                }
            );
            setisincart(response.data.isincart ?? null);
            setcartId(response.data.cartId ?? null);
            console.log("API response data:", response.data);
        } catch (err) {
            console.error("Error fetching product details:", err);
            setError(err as Error);
        } finally {
            setLoading(false); 
        }
    };
    useEffect(() => {
        fetchcartStatus();
    }, [userId, productId]); 
    return { isincart,cartId, error, loading };
};



// upload the product the cart using the userId and productid
export const useUploadToCart = ():{ uploadToCart : (cartId : string | null , productId :string,quantity :number) => Promise<void> ; loading: boolean; error: Error | null } => {
const [error, setError] = useState<Error | null>(null);
const [loading, setLoading] = useState<boolean>(true);


const uploadToCart = async (cartId : string | null, productId: string, quantity: number) => {
    setLoading(true);
    setError(null);
    try {
        const response = await axios.post(
            `${BACKEND_URL}/allcartoption`,
            { productId ,
              cartId,
              quantity
             }, 
            {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            }
        );
        console.log("API response data:", response.data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
};
return { uploadToCart, loading, error };
};

//used to delete the cart item using the cartid 
export const useDeltecartItem = (): { DeleteCartitem: (cartItemId: string) => Promise<void>; loading: boolean; error: Error | null } => {
const [error, setError] = useState<Error | null>(null);
const [loading, setLoading] = useState<boolean>(false); // Initially false

const DeleteCartitem = async (cartItemId: string) => {
    setLoading(true);
    setError(null); // Reset error on a new request
    try {
    const response = await axios.delete(`${BACKEND_URL}/allcartoption/${cartItemId}`);
    console.log("API response for deletion is:", response.data);
    } catch (err) {
    setError(err as Error);
      console.error("Error deleting cart item:", err); // Log the error for debugging
    } finally {
      setLoading(false); // Ensure loading is reset
    }
};

return { DeleteCartitem, loading, error };
};


// export const useDeltecartItem = (onCartRefresh?: () => void):{ DeleteCartitem : (cartItemId : string) => Promise<void> ; loading: boolean; error: Error | null } => {
//     const [error, setError] = useState<Error | null>(null);
//     const [loading, setLoading] = useState<boolean>(true);
    
    
//     const DeleteCartitem = async (cartItemId : string) => {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await axios.delete(`${BACKEND_URL}/allcartoption/${cartItemId}`)
//             console.log("API response for deletion is :", response.data);
//             if (onCartRefresh) {
//                 onCartRefresh();
//             }

//         } catch (err) {
//           setError(err as Error);
//         } finally {
//           setLoading(false);
//         }
//     };
    
//     return { DeleteCartitem , loading, error };
//     };
    
