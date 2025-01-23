import { Link } from "react-router";
import { usePostproducttoorder, usePostShippingDetails } from "../hooks/Order";
import { ShippingAddressForm } from "./ShippingAddressForm";
import { useState } from "react";

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
  customerorderId: string;
  cartId: string;
}

// shippingInput : ShippingInputProps

const Shipping: React.FC<ShippingInputProps> = () => {
  const {order} = ShippingAddressForm();
  const [orderDetails ,setorderDetails] = useState({});
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
  const { cartItems, loading: cartLoading, error: cartError } = usePostproducttoorder(
    shippingDetails?.customerorder.id ? { customerorderId: shippingDetails.customerorder.id, cartId: "6f249203-698c-4e64-bbcd-44b124c6a9dd" } : { customerorderId: "", cartId: "" }
  );

    if (shippingLoading) {
      return <>Loading the shipping details page...</>;
    }

    if (!shippingError) {
      console.log("Error in the shipping page is 1", shippingError);
      return <>Error loading shipping details!</>;
    }

    console.log("Shipping details are", shippingDetails);
    console.log("Shipping details are", shippingDetails?.customerorder.id);
    //  "e5d3a27e-1680-4e18-8a8e-c03eebfc3d0c"
    // "6f249203-698c-4e64-bbcd-44b124c6a9dd"

    if (cartLoading) {
      return <>Loading the shipping details page...</>;
    }

    if (cartError) {
      console.log("Error in the shipping page is 2", cartError);
      return <>Error loading shipping details!</>;
    }

    console.log("carrtitems are :",cartItems);
    console.log("shipping details  are as follow  :", shippingDetails);


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

          <div id="Address-Form" className="w-[883px] shadow-md flex items-center">
            <div className="w-full">
              <div className="p-4">
                <div className="flex text-sm font-medium">
                  <div>vrushabh</div>
                  <div> </div>
                </div>

                <div className="font-thin text-xs font-sans pt-2">
                  <div> apratment number or flat numbers </div>
                  <div>8 th mail amravati raod nagpur </div>
                  <div className="flex gap-1">
                    <div>nagpur</div>
                    <div>maharashtra</div>
                  </div>
                  <div className="flex gap-1">
                    <div>india</div>
                    <div>440023</div>
                  </div>
                  <div className="font-normal">phone : 9356670389</div>
                </div>

                <div className="text-xs font-medium pt-8 text-sky-600">
                  <Link to={"/test"}>Change Address</Link>
                </div>
              </div>
              <hr className="w-full border-t border-gray-300 " />
            </div>
          </div>
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
                <button className="bg-transparent text-white border-none cursor-pointer">
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
