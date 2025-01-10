import { useNavigate } from "react-router";

export interface ProductProps {
    id: string;
    title: string;
    mainImage: string;
    price: string;
    manufacturer: string;
    key: string;
}

export const ProductCard = ({
    id,
    title,
    mainImage,
    price,
    manufacturer,
}: ProductProps) => {
    const navigate = useNavigate();

    const handleImageClick = () => {
        console.log("Navigating to product:", id);
        navigate(`/product/${id}`);
    };

    

    // const handleQuickview = () => {
    //     navigate("/test");
    // };

    return (
        
        <div className="w-80 h-full cursor-pointer border-2 border-slate-200" onClick={handleImageClick}>
            <div>
                <div className="relative group w-full h-full">
                    <img
                        src={mainImage}
                        alt="Sample Image"
                        className="w-308 h-380 object-contain object-center "
                    />
                    <div id="nestedbuttonwrapper" className="">
                        <button
                            onClick={() => {
                                // e.stopPropagation(); // Prevent click event from bubbling up to the card
                                // handleQuickview();
                            }}
                            className="absolute w-full h-10 bottom-0 z-40 flex items-center justify-center bg-yellow-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                            View More
                        </button>
                    </div>
                </div>
                <div className="flex flex-col ">
                    <div className="flex items-center justify-center font-extrabold text-yellow-600 ">
                        {manufacturer}
                    </div>
                    <div className="flex items-center justify-center  font-extralight">{title}</div>
                    <div className="flex  items-center justify-center font-bold ">
                        <div className="pt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="25" height="30">
                                <text className="font-normal" x="50%" y="50%" textAnchor="middle" dominantBaseline="middle"
                                    fontFamily="Arial, sans-serif" fontSize="70"  fill="black">₹</text>
                            </svg>
                        </div>
                        <span className="">{price}</span>
                    </div>
                </div>
            </div>
            
        </div>
        
    );
};

