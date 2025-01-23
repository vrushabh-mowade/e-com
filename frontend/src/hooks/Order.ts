import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { BACKEND_URL } from "../config";
import { ShippingInputProps } from "../Components/Shipping";
import { CustCartId } from "../Components/Shipping";

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

export const usePostShippingDetails = (ShippingInputProps: ShippingInputProps): {shippingDetails: CustomerOrderResponse | null; loading: boolean; error: Error | null } => {
  const [shippingDetails, setshippingDetails] = useState<CustomerOrderResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const postshippingDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(`${BACKEND_URL}/customerorder`, {
        // Data to send in the request body
        name: ShippingInputProps.name,
        lastname: ShippingInputProps.lastname,
        phone: ShippingInputProps.phone,
        email: ShippingInputProps.email,
        company: ShippingInputProps.company,
        address: ShippingInputProps.address,
        apartment: ShippingInputProps.apartment,
        postalCode: ShippingInputProps.postalCode,
        status: ShippingInputProps.status,
        city: ShippingInputProps.city,
        country: ShippingInputProps.country,
        orderNotice: ShippingInputProps.orderNotice,
        total: ShippingInputProps.total,
      });

      setshippingDetails(response.data || null);
      console.log("API response data is 1", response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching product details:", err);
      setError(err as Error);
      setLoading(false);
    }
  };
  useEffect(() => {
    postshippingDetails();
  }, []);
  return { shippingDetails, error, loading };
};



//get the cartitem using the carid and then upload it to the customerordered product
export const usePostproducttoorder = (CustCartId: CustCartId): {cartItems: CartItemToOrderProductProp | null; loading: boolean; error: Error | null} => {

  const [cartItems, setcartItems] = useState<CartItemToOrderProductProp | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchshippingDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("customerorderid is ", CustCartId.customerorderId);
      console.log("cart id  is ", CustCartId.cartId);
      const response = await axios.post(`${BACKEND_URL}/allcartoption/cartItemtoorderproduct`,
        {
          customerorderId: CustCartId.customerorderId,
          cartId: CustCartId.cartId,
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

  useEffect(() => {
    fetchshippingDetails();
  }, []);

  return { cartItems, error, loading };
};
