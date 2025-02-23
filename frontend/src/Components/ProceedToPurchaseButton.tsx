import { Link } from "react-router";
import { useCheckExistingShippingDetails } from "../hooks/Order";

export const ProceedToPurchaseButton = () => {
  const { checkShippingDetails , shippingDetails, loading, error } = useCheckExistingShippingDetails() 

    
  const handleProceedToPurchase = () => {
    checkShippingDetails();
  };


  return (
    <div className="w-full flex items-center justify-center bg-[#866528] p-4 text-white text-sm">
      <Link to="/shipping">
        <button
          onClick={handleProceedToPurchase}
          className="bg-transparent text-white border-none cursor-pointer"
        >
          PROCEED TO PURCHASE
        </button>
      </Link>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};
export default ProceedToPurchaseButton;

