export const RatingTag = ({ rate }: { rate: number }) => {
    const floatrating = rate.toFixed(1);
    return <>
        <div className="">
            <svg width="52" height="25" xmlns="http://www.w3.org/2000/svg">
                <rect className="" width="80" height="27" fill="#35A742" rx="2" ry="2" />
                <text x="6" y="18" fontFamily="Arial, sans-serif" className="font-medium text-base" fill="white">{floatrating}</text>
                <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="-25 -4 35 35" strokeWidth="1.5" stroke="white" className="">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
            </svg>
        </div>
    </>
};