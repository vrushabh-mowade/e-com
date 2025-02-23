import { useState, useCallback } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
// Define your backend URL

export interface ProductDetailsType {
  slug: string;
  title: string;
  mainimage: string;
  price: number;
  rating: number;
  description: string;
  manufacturer: string;
  inStock: number;
  categoryId: string;
}

export const useAddProduct = () => {
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const addProduct = useCallback(async (productDetails: ProductDetailsType) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/products`,
        productDetails
      );

      console.log("Product added successfully:", response.data);
      return response.data; // Return response if needed
    } catch (err) {
      console.error("Error adding product:", err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { addProduct, loading, error };
};
