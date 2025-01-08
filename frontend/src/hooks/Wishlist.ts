import { useState ,useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface WishlistResponseProp {
    msg : string,
    inwishlist: boolean
};

export const useGetWishlistdetails = (productId: string , userId :string): { inwishlist : boolean | null, loading: boolean, error: Error | null } => {
    const [inwishlist, setinwishlist] = useState< boolean | null>(null);
    const [error, setError] = useState<Error | null>(null); 
    const [loading, setLoading] = useState<boolean>(true);

    const fetchingwishliststate = async () => {
      try {
        setLoading(true); 
        setError(null); 
        const response = await axios.get(`${BACKEND_URL}/wishlist/toggler/${userId}/${productId}`)
        const data:WishlistResponseProp = response.data;

        if(data?.inwishlist){
            setinwishlist(true);
        }else{
          setinwishlist(false);
        }
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError(err as Error); 
        setinwishlist(null);
      }finally{
        setLoading(false);
      }
    };
  
    useEffect(() => {
      if (productId && userId) {
        fetchingwishliststate();
      }
    }, [productId ,userId]);

    return { inwishlist , loading, error }; 
  };

