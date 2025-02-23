import { useState } from "react";
import PaymentModes from "../Components/PaymentMode";
import { useToPlaceOrder  } from "../hooks/Order";

const PaymentPage = () => {
    const { postShippingDetails, loading, error } = useToPlaceOrder ();
    const [visible,setvisible] = useState(true);

    const handleSubmit = async () => {
        await postShippingDetails();
        setvisible(false);
    };

    return (
        <div className="flex justify-center">
            <div className="grid grid-flow-col auto-cols-max">
                <div>
                    <div className="w-[883px]">
                        <PaymentModes />
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="w-[300px] h-[250px] shadow-md bg-[#FAFAFA] flex flex-col justify-between">
                        <div className="p-4">
                            <div className="text-base font-semibold font-serif text-zinc-600">
                                Order details
                            </div>
                            <div className="p-1 text-xs font-sans font-light">
                                <div className="flex justify-between p-1">
                                    <div>Bag MRP</div>
                                    <div>₹12000</div>
                                </div>
                                <div className="flex justify-between p-1">
                                    <div>Platform fees</div>
                                    <div>₹12</div>
                                </div>
                            </div>
                            <div className="flex justify-between p-1 text-sm font-sans font-light font-medium">
                                <div>Total price</div>
                                <div className="font-semibold">₹400</div>
                            </div>
                        </div>
                        {
                            visible ? <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className={`w-full p-4 text-white text-sm ${loading ? 'opacity-50 cursor-not-allowed' : 'bg-[#866528]'}`}
                        >
                            {loading ? 'Placing Order...' : 'Place Order'}
                        </button>: <>
                        <button
                            disabled={loading}
                            className={`w-full p-4 text-white text-sm bg-green-500`}
                        >
                        Order Placed
                        </button></>
                        }
                        
                    </div>
                    {error && (
                        <div className="text-red-500 text-xs mt-2">
                            Error: {error.message || "Failed to place order."}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
