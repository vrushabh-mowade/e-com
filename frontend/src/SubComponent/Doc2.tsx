import { Heading } from "./Doc1"
import { Headingcluster } from "./Doc1";

const Doc2 = () => {
  return<>
  <div className="border-2 h-96  md:w-96 lg:w-1186 ml-[364px]">
      <div id="sortby-topbar">
        <hr className="border-t border-gray-300 my-0.5" />
        <div className="flex items-center h-10 bg-productbarcolor font-bold text-sm text-slate-800 ">
          <span className="bg-white p-3 rounded-sm" >SORT BY</span>
          <div className="pl-5 p-3  hover:bg-sortbartexthovercolor hover:font-black hover:text-base ">
            Categories
          </div>
          <div className="p-3  hover:bg-sortbartexthovercolor hover:font-black hover:text-base">
            Brand
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


export const Doc2Data = () => {
    return<>
    <div>
          <Heading />
          <Heading />
          hii
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
    </>
}

export default Doc2
