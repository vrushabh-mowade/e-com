import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import { ShippingInputProps } from "../Components/Shipping";
import { useCallback } from "react";

interface CustomerOrderResponse {
  customerorder: {
    id: string;
    name: string;
    lastname: string;
    phone: string;
    email: string;
    company: string;
    address: string;
    apartment: string;
    postalCode: string;
    dateTime: string;
    status: string;
    city: string;
    country: string;
    orderNotice: string;
    total: number;
  };
  msg: string;
}

interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
}

interface CartItemToOrderProductProp {
  msg: string;
  cartitemsData: CartItem[];
}



export const useToPlaceOrder = (): { postShippingDetails: () => Promise<void>; loading: boolean; error: Error | null } => {
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const details = sessionStorage.getItem("shippingDetails");
    if (details) {
      setOrderDetails(JSON.parse(details));
    }
  }, []); // Runs only once when the component mounts

  const postShippingDetails = useCallback(async () => {
    try {
      setLoading(true);
      console.log("The order details are:", orderDetails);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    } catch (err) {
      setError(err as Error);
      setLoading(false);
    }
  }, [orderDetails]); // Add orderDetails as a dependency

  return { postShippingDetails, loading, error };
};



export const useCheckExistingShippingDetails = (): {  checkShippingDetails : () => Promise<void> ;shippingDetails: CustomerOrderResponse | null; loading: boolean; error: Error | null} => {
  const [shippingDetails, setShippingDetails] = useState<CustomerOrderResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const userId = localStorage.getItem("userId");
  const checkExistingOrder = async ()=>{
    try {
      setLoading(true);
      const response = await axios.post(
        `${BACKEND_URL}/customerorder/orderdetailsexists`,
        {userId : userId}
      );
      if (response.data) {
        setShippingDetails(response.data);
        sessionStorage.setItem("shippingDetails", JSON.stringify(response.data));
      } 
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };
  const checkShippingDetails = useCallback(async () => {
    await checkExistingOrder(); 
  }, [checkExistingOrder]);
  return { checkShippingDetails ,shippingDetails, loading, error };
};





export const usePostShippingDetails = (shippingInput: ShippingInputProps): { postShippingDetails: () => Promise<void>; shippingDetails: CustomerOrderResponse | null; loading: boolean; error: Error | null} => {
  const [shippingDetailsexists, setShippingDetailsexists] = useState<boolean | null>(null);
  const [shippingDetails, setShippingDetails] = useState<CustomerOrderResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const checkExistingOrder = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${BACKEND_URL}/customerorder/orderdetailsexists`,


        {userId : userId},
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      if (response.data.exists) {
        setShippingDetailsexists(true);
        setShippingDetails(response.data);
      } else {
        setShippingDetailsexists(false);
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [userId, token]);

  const submitShippingDetails = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${BACKEND_URL}/customerorder`, {
        ...shippingInput,
      });
      setShippingDetails(response.data || null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [shippingInput]);

  const postShippingDetails = useCallback(async () => {
    console.log("before the exists");
    await checkExistingOrder(); 
    console.log("after the exists");
    if (shippingDetailsexists === false) {
      console.log("before the exists 1");
      await submitShippingDetails();
      console.log("before the exists 2");
    }
  }, [checkExistingOrder, submitShippingDetails, shippingDetailsexists]);

  return { postShippingDetails, shippingDetails, loading, error };
};



//get the cartitem using the carid and then upload it to the customerordered product
export const usePostproducttoorder = (): {  producttoOrder : ( CustCartId: string , CustomerorderId  :string) => Promise<void>; loading: boolean; error: Error | null} => {

  const [cartItems, setcartItems] = useState<CartItemToOrderProductProp | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const producttoOrder = async (CustCartId: string , CustomerorderId :string) => {
    try {
      setLoading(true);
      setError(null);
      console.log("customerorderid is ", CustomerorderId);
      console.log("cart id  is ", CustCartId);
      const response = await axios.post(`${BACKEND_URL}/allcartoption/cartItemtoorderproduct`,
        {
          customerorderId: CustomerorderId,
          cartId: CustCartId,
        }
      );
      setcartItems(response.data || null);
      console.log("API response data is 2", response.data);
      console.log(
        "API response data is 2 in cartitems",
        response.data.cartItems
      );
      setLoading(false);
    } catch (err) {
      console.error("Error fetching product details:", err);
      setError(err as Error);
      setLoading(false);
    }
  };

  return {producttoOrder, error, loading };
};

export const usetopostCustomerOrder = (): { postFormDetails : ( order : ShippingInputProps ) => Promise<void> ;loading: boolean; error: Error | null} => {
  const [details ,setdetails] = useState<CustomerOrderResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const postFormDetails = async (ShippingInputProps :ShippingInputProps) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post(`${BACKEND_URL}/customerorder`,{
        name : ShippingInputProps.name,
        lastname : ShippingInputProps.lastname,
        phone : ShippingInputProps.phone,
        email :ShippingInputProps.email,
        company :ShippingInputProps.company,
        address :ShippingInputProps.address,
        apartment :ShippingInputProps.apartment,
        postalCode : ShippingInputProps.postalCode,
        status :ShippingInputProps.status,
        paymentStatus : ShippingInputProps.paymentStatus,
        city :ShippingInputProps.city,
        country :ShippingInputProps.country,
        orderNotice :ShippingInputProps.orderNotice,
        total :ShippingInputProps.total,
        cartId :ShippingInputProps.cartId,
        userId: ShippingInputProps.userId
      });
      setdetails(response.data || null);
      console.log("the order conformes is and order details are ",response);

      setLoading(false);
    } catch (err) {
      console.error("Error fetching product details:", err);
      setError(err as Error);
      setLoading(false);
    }
  };

  sessionStorage.setItem("shippingDetails",JSON.stringify(details))

  return {  postFormDetails ,error, loading };
};



