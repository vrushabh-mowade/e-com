import { useDeltecartItem } from "../hooks/Cart";


const Rightsidebar = ({price ,cartItemId ,onDelete } : {price :string ,cartItemId :string ,onDelete : ()=>(void)} ) => {
  const { DeleteCartitem , loading, error } = useDeltecartItem(onDelete);

  const DeleteItem = async () =>{
    try {
      await DeleteCartitem(cartItemId);
    } catch (err) {
      console.error("Error deleting the cartitem:", err);
    }
    
  }
return (
    
    <div className="flex flex-col p-4 text-right justify-between">
        <div className="flex flex-col">
            <div className="flex flex-row-reverse text-sm ">
                <div className="flex justify-center items-center  gap-1  w-20">
                    <span className="font-light"> MRP </span>
                    <div className="text-base font-normal "> 230 </div>
                </div>
            </div>
        
            <div className="flex flex-row-reverse ">
                <div className="bg-blue-200 w-20 flex justify-center items-center">
                    <span className="font-bold pr-2">Rs.</span>
                    {price}
                    </div>
                <div className="bg-blue-900 w-1 h-6 font-medium"></div>
            </div>
        </div>


        <div className="flex gap-6">
          <button onClick={DeleteItem}> <div className="font-medium text-sm text-sky-900"> Delete </div></button>
          <div className=" flex items-center justify-center font-medium text-sm text-sky-900 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
            Move to wishlist
          </div>
        </div>
    </div>
        

)
}

export default Rightsidebar
