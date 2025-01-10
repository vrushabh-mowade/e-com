import axios from "axios";
import { useEffect, useState } from "react"
import  { BACKEND_URL } from '../config'
import {ProductProps}  from  '../Components/Productcard'
import { ProductResponse } from "../Components/DetailedProductInfo";


export const useProduct = () => {
    const [products ,setProducts] = useState <ProductProps[]>([]);
    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/products`,{
              headers : {
                  "Authorization": localStorage.getItem("token")
              }
          });
            setProducts(response.data.products || []); // Set fetched data to state
            // setLoading(false); // Stop loading
        } catch (err) {
            setProducts([])
            console.log("error is ",err)
            
            // setError(err); // Capture and set error
            // setLoading(false);
        }
    };
    useEffect(()=>{
        fetchProducts();
    },[])
    console.log("array is :",{products:products})
    return {products:products}
};




export const useGetProductdetails = (id: string): { details: ProductResponse | null, loading: boolean, error: Error | null } => {
    const [details, setDetails] = useState<ProductResponse | null>(null);
    const [error, setError] = useState<Error | null>(null); 
    const [loading, setLoading] = useState<boolean>(true);
    const fetchingDetails = async () => {

      try {
        setLoading(true); 
        setError(null); 
        const response = await axios.get(`${BACKEND_URL}/products/${id}`,{
          headers : {
              Authorization : localStorage.getItem("token")
          }
      });
        setDetails(response.data || null); 
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError(err as Error); 
        setLoading(false); 
      }
    };
  
    useEffect(() => {
      if (id) {
        fetchingDetails();
      }
    }, [id]);

    return { details, loading, error}; 
  };






interface ImageResponse {
  images: string[];
}

export const useGetProductImages = (id: string) => {
  const [imageData, setimageData] = useState<ImageResponse |null>(null); // Type the state as an array of images

  const fetchingimages = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/images/${id}`,{
        headers : {
            Authorization : localStorage.getItem("token")
        }
    });
      console.log("API response for images:", response.data);
      setimageData(response.data || []); // Set the fetched data to state
    } catch (err) {
      console.error("Error fetching images:", err);
      // Optionally set an error state here
    }
  };

  useEffect(() => {
    fetchingimages();
  }, [id]); // Fetch images when the product ID changes

  console.log("The images array  is:", imageData); // Correct logging for image data

  return {
    imageData,
  };
};


// export const useGetProductImages=(id : string)=>{
//     const [imageData ,setimageData]  = useState();
//     const fetchingimages = async () =>{

//         try {
//             const response = await axios.get(`${BACKEND_URL}/images/${id}`);
//             console.log("api of images",response.data);
//             setimageData(response.data || []); // Set fetched data to state
//             // setLoading(false); // Stop loading
//         } catch (err) {
//             // setdetails([]);
//             console.log("error is ",err)
            
//             // setError(err); // Capture and set error
//             // setLoading(false);
//         }
//     };

//     useEffect(
//         ()=>{fetchingimages()
//         },[id]);
//         console.log("the images data is :" ,{imageData});
//         return{
//             imageData
//         }
// }
