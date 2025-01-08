




const Topproductbar = () => {
    return (<>
    <div className="flex justify-center items-center p-10 font-serif text-slate-800 text-4xl  antialiased ">Shoes
    </div>
    <div className="pb-5">
    <hr className="border-t border-gray-300 my-0.5" />
        <div aria-label="top-div-productbar" className=" h-10 flex justify-between items-center bg-productbarcolor px-5 font-bold text-sm text-slate-800">
            <div className="">
                <span>568237 Items found</span>
            </div>
            <div className="pl-8">
                <span>GRID</span>
            </div>
            <div className="flex gap-2 pr-7">
                <span>SORT BY </span>
                <select className="w-44 px-2 bg-white border-1 border-slate-600 ">
                    <option>Rating</option>
                    <option>PRICE (High to Low) </option>
                    <option>Revelence</option>
                    <option>PRICE (Low to High) </option>
                </select>
            </div>
        </div>
        <hr className="border-t border-gray-300 my-0.5" />
    </div>
    </>
    )
}

export default Topproductbar;
