import { useEffect, useState } from "react";
// import { useChangeImage } from "../hooks/products";


export const ChangingImagecomponent = () => {
    const imagearray = ["https://as2.ftcdn.net/v2/jpg/03/36/63/73/1000_F_336637389_Rmv37bNwCc5lBM5Peg1LsBNrlDpt8hhQ.jpg", "https://as1.ftcdn.net/v2/jpg/03/36/63/74/1000_F_336637413_J4X3S40WeIGm5bXXVM4cenVeGALvayGk.jpg",
        "https://as1.ftcdn.net/v2/jpg/03/36/63/74/1000_F_336637421_WlbmHBzaHhTAnzcYLttx9yISAWPo7pAU.jpg",
    ];

    const [mainimage, setmainimage] = useState(imagearray[0]);
    const [count, setCount] = useState(0);
    

    const changeimage = (side :string) => {
        if(side === 'right'){
            setmainimage(imagearray[count+1])
        }
        else if(side === 'left'){
            setmainimage(imagearray[count-1])
        }
    };
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCount((prevCount) => (prevCount + 1) % imagearray.length);
            setmainimage(imagearray[count]);
        }, 5000); // 5 seconds

        return () => clearInterval(intervalId);
    },[count, imagearray]);

    return <>
        <div className="">
            <div className="flex gap-2">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-center">
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>
                    </div>
                    <img
                        src={imagearray[0]} //https://placehold.co/60x80
                        alt="Thumbnail 1"
                        className="border-black border-2 rounded w-52 h-54"
                    />
                    <img
                        src={imagearray[1]}
                        alt="Thumbnail 2"
                        className="border rounded w-52 h-60"
                    />
                    <img
                        src={imagearray[2]}
                        alt="Thumbnail 3"
                        className="border rounded w-52 h-60"
                    />
                    <div className="flex items-center justify-center">
                        <button >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>

                    </div>
                </div>


                <div className="flex items-center justify-center">
                    <button onClick={()=>{changeimage('left')}}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                </div>
                <img
                    src={mainimage}  //"https://placehold.co/400x500"
                    alt="Main product image"
                    className="w-1/2 h-auto rounded-lg"
                />
                <div className="flex items-center justify-center">
                    <button onClick={()=>{changeimage('right')}}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </>
}