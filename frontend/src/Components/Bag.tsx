import { useParams } from "react-router";
import { useGetProductdetails } from "../hooks/products";
import { useEffect,useState } from "react";
import { Product } from "../Pages/ProductPage";

const Bag = () => {
  const { id } = useParams();
  const { details } = useGetProductdetails(id || "");
    const [productDetails, setProductDetails] = useState<Product| null>(null);
  
    useEffect(() => {
      if (details) {
        setProductDetails(details?.product);
      }
    }, [details,id]);
  
    if (!details) {
      console.warn("Details are loading:", { details,productDetails});
      return <div>Loading product details ...</div>;
    }
  
    if (!productDetails) {
      return <div>Loading...</div>;
    }
    console.log("product details from bag component and testing",productDetails);
return (
    <div>
    bag component check 
    </div>
)
}


export default Bag
