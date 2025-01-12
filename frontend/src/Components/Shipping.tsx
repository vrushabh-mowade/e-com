import { Link } from "react-router";
import { usePostproducttoorder, usePostShippingDetails } from "../hooks/Order";


export interface ShippingInputProps {
    name: string;
    lastname: string;
    phone: string;
    email: string;
    company: string;
    address: string;
    apartment: string;
    postalCode: string;
    status: string;
    city: string;
    country: string;
    orderNotice: string;
    total: number;
}

export interface CustCartId {
  customerorderId : string , 
  cartId : string
}


// shippingInput : ShippingInputProps

const Shipping: React.FC<ShippingInputProps> = () => {



  const { shippingDetails, loading: shippingLoading ,  error: shippingError } = usePostShippingDetails(
  {"name": "yash",
  "lastname": "pandey",
  "phone": "+123456789",
  "email": "john.yashpandey.com",
  "company": "gh raisoni nagpur",
  "address": "hingna t point",
  "apartment": "4A",
  "postalCode": "12345",
  "status": "Pending",
  "city": "Metropolis",
  "country": "india",
  "orderNotice": "Leave the package at the front door.",
  "total": 100}
);

  if (shippingLoading) {
    return <>Loading the shipping details page...</>;
  }

  if (shippingError) {
    console.log("Error in the shipping page is", shippingError);
    return <>Error loading shipping details!</>;
  }

  console.log("Shipping details are", shippingDetails);
  console.log("Shipping details are", shippingDetails?.customerorder.id);
  //  "e5d3a27e-1680-4e18-8a8e-c03eebfc3d0c"
  // "6f249203-698c-4e64-bbcd-44b124c6a9dd"
  
  const { cartItems, loading: cartLoading, error: cartError } = usePostproducttoorder({customerorderId : shippingDetails?.customerorder.id  , cartId : ""});
  if (cartLoading) {
    return <>Loading the shipping details page...</>;
  }

  if (cartError) {
    console.log("Error in the shipping page is", cartError);
    return <>Error loading shipping details!</>;
  }


  return (
    <div className="flex justify-center">
      <div className="grid grid-flow-col auto-cols-max">
        <div className="w-[883px] h-40 shadow-md">
          <div>Hi</div>
        </div>

        <div className="flex flex-col">
          <div className="w-[300px] h-[250px] shadow-md bg-[#FAFAFA] flex flex-col justify-between ">
            <div className="p-4">
              <div className="text-base font-semibold font-serif text-zinc-600">
                Order details
              </div>

              <div className="p-1 text-xs font-sans font-light">
                <div className="flex justify-between p-1">
                  <div>Bag MRP</div>
                  <div className="">12000</div>
                </div>

                <div className="flex justify-between p-1">
                  <div>Platform fees</div>
                  <div>12</div>
                </div>
              </div>

              <div className="flex justify-between p-1 text-sm font-sans font-light">
                <div>Total price</div>
                <div>400</div>
              </div>
            </div>
            <div className="w-full flex items-center justify-center bg-[#866528] p-4 text-white text-sm">
              <Link to={"/shipping"}>
                <button className="bg-transparent text-white border-none cursor-pointer">
                  PROCEED TO PURCHASE
                </button>
              </Link>
            </div>
          </div>
          <div>Hi</div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
