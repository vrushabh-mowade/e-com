import { Link, useNavigate } from "react-router";
import { usePostproducttoorder } from "../hooks/Order";
import { useEffect ,useState} from "react";



export interface CustomerOrderResponse {
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
    paymentStatus: string;
    city: string;
    country: string;
    orderNotice: string;
    total: number;
    userId: string;
    cartId: string | null;
  };
  msg: string;
}

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
  paymentStatus: string;
  city: string;
  country: string;
  orderNotice: string;
  total: number;
  cartId: string;
  userId: string;
}

export interface CustCartId {
  customerorderId: string;
  cartId: string;
}

// shippingInput : ShippingInputProps

const Shipping: React.FC = () => {
  const navigate = useNavigate();
  const [exists, setexists] = useState<Boolean>(false);
  const [shippingDetails, setshippingDetails] = useState<any | null>(null);
  const [loading ,setloading] = useState(true);
  const { producttoOrder , loading: cartLoading, error: cartError } = usePostproducttoorder();

  const loadShippingDetails = () => {
    const shippingDetailsData = sessionStorage.getItem("shippingDetails");
    if (shippingDetailsData) {
      try {
        const parsedDetails = JSON.parse(shippingDetailsData);
        if (parsedDetails?.msg !== "empty" && parsedDetails?.customerorder) {
          console.log("Parsed data:", parsedDetails);
          setshippingDetails(parsedDetails);
          setexists(true);
          setloading(false);
        } else {
          console.log("Empty shipping details.");
          setexists(false);
          setloading(false);
        }
      } catch (error) {
        console.error("Error parsing shipping details:", error);
        setexists(false);
      }
    } else {
      setexists(false);
      setloading(true);
    }
  };

  // Effect to load details on component mount
  useEffect(() => {
    if (!exists) {
      loadShippingDetails();
    }
  }, [exists]);
  

  // Effect to re-run `loadShippingDetails` when sessionStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      loadShippingDetails();
    };
  
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  

  // Trigger re-render when sessionStorage value changes locally
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!exists) {
        loadShippingDetails();
      } else {
        clearInterval(intervalId); // Stop polling if data exists
      }
    }, 1000); // Poll every second
  
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [exists]);
  
  if(loading){
    return <>
      <div >
        <Link to={"/"}>error go to the previous page</Link>
      </div></>

  }


    //  "e5d3a27e-1680-4e18-8a8e-c03eebfc3d0c"
    // "6f249203-698c-4e64-bbcd-44b124c6a9dd"

    const handleSubmit = async () => {
            await producttoOrder("6f249203-698c-4e64-bbcd-44b124c6a9dd", "7b440e88-23f1-4f2e-b3a9-98e6b8b60c9d");
            navigate("/checkout");
        };
    


  return (
    <div className="flex justify-center">
      <div className="grid grid-flow-col auto-cols-max">
        <div>
          <div id="Delivery-heading" className="w-[883px] h-12 shadow-md">
            <div className="flex">
              <div className="flex justify-center items-center p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <div className="pl-2">
                  <div className="text-lg">Delivery Address</div>
                  <div className="text-xs">
                    we Delivery to the addreess below
                  </div>
                </div>
              </div>
            </div>
          </div>
          {exists ? (
            <div
              id="Address-Form"
              className="w-[883px] shadow-md flex items-center"
            >
              <div className="w-full">
                <div className="p-4">
                  <div className="flex text-sm font-medium">
                    <div>{shippingDetails?.customerorder.name}</div>
                    <div> </div>
                  </div>
                  <div className="font-thin text-xs font-sans pt-2">
                    <div>{shippingDetails?.customerorder.apartment}</div>
                    <div>{shippingDetails?.customerorder.address}</div>
                    <div className="flex gap-1">
                      <div>{shippingDetails?.customerorder.city}</div>
                      <div>{shippingDetails?.customerorder.city}</div>
                    </div>
                    <div className="flex gap-1">
                      <div>{shippingDetails?.customerorder.country}</div>
                      <div>{shippingDetails?.customerorder.postalCode}</div>
                    </div>
                    <div className="font-normal">phone : {shippingDetails?.customerorder.phone}</div>
                  </div>
                  <div className="text-xs font-medium pt-8 text-sky-600">
                    <Link to={"/test"}>Change Address</Link>
                  </div>
                </div>
                <hr className="w-full border-t border-gray-300 " />
              </div>
            </div>
          ) : (
            <div id="Address-Form" className="w-[883px] shadow-md flex items-center">
              <div className="w-full">
                <div>Give the address</div>
                <div className="text-xs font-medium pt-8 text-sky-600">
                  <Link to={"/test"}>Change Address</Link>
                </div>
                <hr className="w-full border-t border-gray-300 " />
              </div>
            </div>
          )}

          
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
              <Link to={"/checkout"}>
                <button onSubmit={handleSubmit} className="bg-transparent text-white border-none cursor-pointer">
                  PROCEED FOR PAYMENT
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




// <div
//             id="Address-Form"
//             className="w-[883px] shadow-md flex items-center">
//             <div className="w-full">
//               <div className="p-4">
//                 <div className="flex text-sm font-medium">
//                   <div>vrushabh</div>
//                   <div> </div>
//                 </div>

//                 <div className="font-thin text-xs font-sans pt-2">
//                   <div> apratment number or flat numbers </div>
//                   <div>8 th mail amravati raod nagpur </div>
//                   <div className="flex gap-1">
//                     <div>nagpur</div>
//                     <div>maharashtra</div>
//                   </div>
//                   <div className="flex gap-1">
//                     <div>india</div>
//                     <div>440023</div>
//                   </div>
//                   <div className="font-normal">phone : 9356670389</div>
//                 </div>

//                 <div className="text-xs font-medium pt-8 text-sky-600">
//                   <Link to={"/test"}>Change Address</Link>
//                 </div>
//               </div>
//               <hr className="w-full border-t border-gray-300 " />
//             </div>
//           </div>