import { Link } from "react-router";


const PaymentPage = () => {
return (
    <div className="flex justify-center">
        <div className="grid grid-flow-col auto-cols-max">

            <div>
                <div className="w-[883px] bg-green-200">
                    hello
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
                            Place Order
                        </button>
                        </Link>
                    </div>

                    </div>
                <div>Hi</div>
            </div>

        
        </div>
    </div>
)
}

export default PaymentPage
