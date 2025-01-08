import { useState } from "react";

const ProductDetailToggle = () => {
  const [moredetails, setmoredetails] = useState(false);

  const Getmoredetaila = () => {
    setmoredetails((prev) => !prev);
  };

  return (
    <>
      <div className="w-full  p-0.5">
        <div className="p-0.5 text-[#406786] font-sans font-semibold text-sm"> Product details</div>
        <div className="pl-4 p-1 list-disc">
          <ul className="list-disc normal-case leading-relaxed font-sans font-extralight text-xs text-grey-600">
            <li>
              i am vrushabh from nagpur Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Quam nisi illum quibusdam nostrum vitae fuga
              asperiores ex corporis unde numquam eos molestias temporibus
              eligendi iure perferendis ad, magnam animi id.
            </li>
            <li>i am vrushabh from nagpur</li>
            <li>i am vrushabh from nagpur</li>
            <li>i am vrushabh from nagpur</li>
          </ul>
          {moredetails ? (
            <>
              <ul className="list-disc normal-case leading-relaxed font-sans font-extralight text-xs text-grey-600">
                <li>
                  i am vrushabh from nagpur Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Tempora pariatur qui hic
                  adipisci, temporibus optio nam, sint natus exercitationem
                  ducimus at molestiae perferendis nisi doloremque beatae
                  debitis quas, deserunt earum!
                </li>
                <li>i am vrushabh from nagpur</li>
                <li>i am vrushabh from nagpur</li>
                <li>i am vrushabh from nagpur</li>
              </ul>
            </>
          ) : (
            <></>
          )}

          {moredetails ? (
            <>
              <ul className="text-cyan-700">
                <button onClick={Getmoredetaila}>
                  <li className="flex items-center text-xs font-semibold  font-sans justify-center gap-0.5">
                    Less Information
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 15.75 7.5-7.5 7.5 7.5"
                      />
                    </svg>
                  </li>
                </button>
              </ul>
            </>
          ) : (
            <>
              <ul className="text-cyan-700">
                <button onClick={Getmoredetaila}>
                  <li className="flex items-center text-xs font-semibold font-sans justify-center  gap-0.5 ">
                    other Information
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </li>
                </button>
              </ul>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetailToggle;
