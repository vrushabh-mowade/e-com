
export const SkeletonCartItem = () => {
  return (
    <div className="w-[883px] h-40 shadow-md flex justify-between animate-pulse bg-gray-200">
      {/* Left Section */}
      <div className="flex">
        {/* Image Skeleton */}
        <div className="h-40 w-40 bg-gray-300"></div>

        {/* Text Skeleton */}
        <div className="flex flex-col justify-center p-4">
          <div className="bg-gray-300 w-24 h-4 mb-2 rounded"></div>
          <div className="bg-gray-300 w-32 h-3 rounded"></div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-center items-end pr-4">
        <div className="bg-gray-300 w-20 h-5 mb-2 rounded"></div>
        <div className="bg-gray-300 w-16 h-4 rounded"></div>
      </div>
    </div>
  );
};
