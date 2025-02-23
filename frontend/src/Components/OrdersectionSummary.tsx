
import ProceedToPurchaseButton from "./ProceedToPurchaseButton";

const OrdersectionSummary = ({total}  : {total :number}) => {
  return (
    <div className="flex flex-col">
          <div className="w-[300px] h-[250px] shadow-md bg-[#FAFAFA] flex flex-col justify-between">
            <div className="p-4">
              <div className="text-base font-semibold font-serif text-zinc-600">
                Order Details
              </div>
              <div className="p-1 text-xs font-sans font-light">
                <div className="flex justify-between p-1">
                  <div>Bag MRP</div>
                  <div>₹ {total}</div>
                </div>
                <div className="flex justify-between p-1">
                  <div>Platform Fees</div>
                  <div>₹ 12</div>
                </div>
              </div>
              <div className="flex justify-between p-1 text-sm font-sans font-light">
                <div>Total Price</div>
                <div>₹ {total + 12}</div>
              </div>
            </div>
            <ProceedToPurchaseButton/>
          </div>
        </div>

  )
}

export default OrdersectionSummary
