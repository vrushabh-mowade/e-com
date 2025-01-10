import Rightsidebar from "../SubComponent/Rightsidebar";

export interface CartProps {
  title: string;
  mainImage: string;
  price: string;
  manufacturer: string;
}

export const CartItem = ({
  manufacturer , 
  title ,
  mainImage ,
  price

} : CartProps) => {
  return (
    <div className="w-[883px] h-40  shadow-md flex justify-between">
      <div className="flex">
        <div className="h-40 w-40">
          <img
            className="w-full h-full object-cover"
            src={mainImage}
            alt="Product"
          />
        </div>

        <div className="flex flex-col text-zinc-700 hover:text-black p-4">
          <div className="font-light text-base">{manufacturer}</div>
          <div className="text-sm ">{title}</div>
        </div>
      </div>
      <Rightsidebar price={price} />
    </div>
  );
};
