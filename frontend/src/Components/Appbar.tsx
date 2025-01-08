import CartDoc from "../SubComponent/CartDoc";
import Doc1 from "../SubComponent/Doc1";
import WishlistDocs from "../SubComponent/WishlistDocs";
import Searchbar from "./Searchbar";



const Appbar = () => {
    return <>
        <header className="relative h-20 w-full shadow-sm shadow-slate-900 sticky top-0 z-10 bg-white">
            <div id="websitename" className="absolute top-9 sm:left-4  md:left-4 lg:left-10 xl:left-16 2xl:left-64 ">
                <span className="text-3xl">Ecom</span>
            </div>
            <div className="absolute sm:top-8 md:top-10  sm:right-0 md:right-0 lg:right-0 xl:right-32 2xl:right-[340px]">
                <div className=" flex items-center justify-center  sm:space-x-1 md:space-x-4 lg:space-x-6 xl:space-x-8 2xl:space-x-8">
                    <div className="invisible md:invisible lg:visible">
                        <div className="relative group/Mens flex items-center justify-center  text-sm font-medium hover:font-extrabold">
                            <a href="/test">MENS</a>
                            <div className="absolute top-6 left-96 transform -translate-x-1/2 invisible   group-hover/Mens:visible group-hover/Mens:ml-0  pointer-events-none"><Doc1 /></div>
                        </div>
                    </div>
                    <div className="invisible md:invisible lg:visible">
                        <div className="flex group/Womens items-center justify-center text-sm font-medium hover:font-extrabold">
                            <a href="/test">WOMENS</a>
                            <div className="absolute top-6 left-96 transform -translate-x-1/2 invisible group-hover/Womens:visible group-hover/womens:ml-0 "><Doc1 /></div>  
                        </div>
                    </div>
                    <div className="invisible md:invisible lg:visible" >
                        <div className="flex items-center justify-center text-sm font-medium hover:font-extrabold">BEAUTY</div>
                    </div>
                    <div className="invisible md:invisible lg:visible">
                        <div className="flex items-center justify-center text-sm font-medium hover:font-extrabold">KITCHESN AND WORK</div>
                    </div>
                    <div className="invisible md:invisible lg:visible">
                        <div className="flex items-center justify-center text-sm font-medium hover:font-extrabold">KIDS</div>
                    </div>
                    <div className="">
                        <Searchbar/>
                    </div>
                    <div className="">
                        <div className="relative group/CartDetails" >
                            <a href="/test">
                                <img src="/cart.svg" alt="Cart" className="md:h-7 md:w-7 sm:h-9 sm:w-9 object-contain" />
                                <div className="absolute top-10 right-0  invisible group-hover/CartDetails:visible"><CartDoc/></div>
                            </a>
                        </div>
                    </div>                 
                    <div className="invisible lg:visible">
                        <div className="relative group/Wishlist">
                            <a href="/test">
                                <img src="/wishlist.png" alt="wishlist" className="flex items-center justify-center h-6 w-6 object-contain" />
                            </a>
                        <div className="absolute top-10 right-0  invisible group-hover/Wishlist:visible"><WishlistDocs/></div>
                    </div>

                    </div>
                </div>
            </div>
        </header>
    </>

}

export default Appbar;