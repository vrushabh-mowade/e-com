
export const Headingcluster = () => {
  return (<>
    <div className="pl-4 py-1">
      <div className="text-sm text-zinc-900 font-sans font-bold ">SNEAKER BRAND</div>
      <div className="flex flex-col text-zinc-800 text-sm font-light">
        <Subheading brandname="Nike" />
        <a href="/test" className="hover:underline">Adidas</a>
        <a href="/test" className="hover:underline">Puma</a>
        <a href="/test" className="hover:underline">Campus</a>
        <a href="/test" className="hover:underline">Naive&apos; choice</a>
      </div>
    </div>
  </>);

}

export const Subheading = ({ brandname }: { brandname: string }) => {
  return <>
    <div>
      <div className="flex flex-col text-zinc-800 text-sm font-light">
        <a href="/test" className="hover:underline">{brandname}</a>
      </div>
    </div>
  </>

};

export const Heading = () => {
  return (<>
    <div className="pl-4 py-1">
      <div className="text-sm text-zinc-900 font--serif font-bold">ACCEORIES</div>
    </div>
  </>);

}



const Doc1 = () => {
  return <>
    <div className="border-2 h-96 bg-white md:w-96 lg:w-1186 ">
      <div id="sortby-topbar">
        <hr className="border-t border-gray-300 my-0.5" />
        <div className="flex items-center h-10 bg-productbarcolor font-bold text-sm text-slate-800 ">
          <span className="bg-white p-3 rounded-sm" >SORT BY</span>
          <div className="pl-5 p-3  hover:bg-sortbartexthovercolor hover:font-black hover:text-base ">
            Categories
          </div>
          <div className="">
            <div className="p-3  hover:bg-sortbartexthovercolor hover:font-black hover:text-base ">
              Brand
            </div>
          </div>
        </div>
        <hr className="border-t border-gray-300 my-0.5" />
      </div>

      <div className="grid grid-cols-4 m-2">
        <div>
          <Heading />
          <Heading />
          <Headingcluster />
          <Headingcluster />
        </div>
        <div>
          <Heading />
          <Heading />
          <Headingcluster />
          <Headingcluster />
        </div>
        <div>
          <Heading />
          <Heading />
          <Headingcluster />
          <Headingcluster />
        </div>
        <div>
          <Heading />
          <Heading />
          <Headingcluster />
          <Headingcluster />
        </div>

      </div>


    </div>

  </>
}

export default Doc1;
