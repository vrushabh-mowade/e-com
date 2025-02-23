import { useState } from "react";
import axios from "axios";

export interface UpdateAddressInput {
  id: string; // Customer order ID
  name: string;
  lastname: string;
  phone: string;
  email: string;
  company: string;
  address: string;
  apartment: string;
  postalCode: string;
  status: string;
  paymentStatus: string;
  city: string;
  country: string;
  orderNotice: string;
  total: number;
}

export interface UpdateAddressResponse {
  updatedOrder?: Record<string, any>; // The updated order object
  error?: string; // Error message, if any
  msg?: string; // Success message, if any
}

const useUpdateAddress = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<UpdateAddressResponse | null>(null);

  const updateAddress = async (input: UpdateAddressInput) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.put(`/api/customer-order/${input.id}`, input);

      setResponse(res.data);
    } catch (err: any) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { updateAddress, loading, error, response };
};

export default useUpdateAddress;
