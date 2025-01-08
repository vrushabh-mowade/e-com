import {  useState } from "react";
import { useEffect } from "react";

interface SliderProps {
  currentindex: number;
  Imagearray: string[];
};




// const Imagearray = [
//   "https://assets.ajio.com/medias/sys_master/root/20241119/WpVO/673bbd630f47f80c87944617/-473Wx593H-700771477-white-MODEL6.jpg",
//   "https://assets.ajio.com/medias/sys_master/root/20231203/UQLZ/656c8304afa4cf41f5afbdbd/-473Wx593H-466847644-black-MODEL7.jpg",
//   "https://assets.ajio.com/medias/sys_master/root/20231204/krsd/656d03bfddf7791519ae3b33/-473Wx593H-466847548-blue-MODEL.jpg",
//   "https://assets.ajio.com/medias/sys_master/root/20231203/1RaA/656c8463ddf7791519acb550/-473Wx593H-466847555-maroon-MODEL.jpg",
//   "https://assets.ajio.com/medias/sys_master/root/20240927/MFEb/66f6d60f260f9c41e8362dda/-473Wx593H-420497672-grey-MODEL.jpg",
//   "https://assets.ajio.com/medias/sys_master/root/20231025/ndzW/6538efcfafa4cf41f55f6df8/-473Wx593H-466745415-olive-MODEL.jpg",
//   "https://assets.ajio.com/medias/sys_master/root/20240731/G89A/66aa40981d763220fa511728/red-tape-black-walking-women-sports-shoes-with-lacefastening.jpg"
// ];


const ImageComponent = ({Imagearray}: {Imagearray : string[]} ) => {

  const [currentindex ,setcurrentindex] = useState(0);

  const GetNextImage =(currentindex :number , array :string[])=>{
    setcurrentindex((currentindex+1)%array.length);
  }

  const  GetPrevImage = ( currentindex :number , array : string[]) => {
    setcurrentindex(((currentindex-1)+ array.length) %array.length);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setcurrentindex((prevIndex) => (prevIndex + 1) % Imagearray.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, [Imagearray]);

  // Debugging logs
  useEffect(() => {
  }, [currentindex, Imagearray]);

  if (Imagearray.length === 0) {
    return <div>Loading Images...</div>;
  }


  return (
      <div className="flex">
            <div className="w-52">
              <div className="grid grid-flow-col auto-cols-max bg-white">
                <Slider currentindex={currentindex} Imagearray={Imagearray} />
              </div>
            </div>
            <div className="w-475">
              <div>
                <div className="flex">
                <div className=" grid grid-flow-col auto-cols-max bg-yellow-200">
                  <div className="flex justify-center items-center w-2 bg-blue-200">
                    <button onClick={()=>{GetPrevImage(currentindex  ,Imagearray)} }>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"  stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                  </div>

                  <div>
                    <img height="593" width="473" src={Imagearray[currentindex]} alt={`Slide ${currentindex + 1}`}>
                    </img>
                  </div>

                  <div className="flex justify-center items-center w-2 bg-blue-200">
                    <button onClick={()=>{GetNextImage(currentindex  ,Imagearray)} }>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                  </div>
                </div>
                </div>
              </div>
            </div>
      </div>
    
  );
};



export const Slider=({currentindex ,Imagearray}: SliderProps)=>{
  return<>
  <div className="flex justify-center p-2">
    <div className="flex flex-col gap-2">
        <div className="flex items-center justify-center">
              <button>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 ">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
              </svg>
              </button>
        </div>
      <div className="flex items-center justify-center"><img  width="50" src={Imagearray[((currentindex-2)+ Imagearray.length) %Imagearray.length]}></img></div>
      <div className="flex items-center justify-center"><img  width="50" src={Imagearray[((currentindex-1)+ Imagearray.length) %Imagearray.length]}></img></div>
      <div className={`flex items-center justify-center outline-double outline-1 outline-offset-2`}><img  width="50" src={Imagearray[currentindex]}></img></div>
      <div className="flex items-center justify-center"><img  width="50" src={Imagearray[(currentindex+1)%Imagearray.length]}></img></div>
      <div className="flex items-center justify-center"><img  width="50" src={Imagearray[(currentindex+2)%Imagearray.length]}></img></div>
        <div className="flex items-center justify-center">
          <button>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
          </button>
        </div>
    </div>
  </div>
  </>
}


export default ImageComponent;




