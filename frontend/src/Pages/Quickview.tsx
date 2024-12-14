const Quickview = () => {

    const Productimages = ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxo3ATF_zL8K16-UikWgHPeP8G0yI6Y7EOu50Evzhw0CU6yrnzBskpAa9Tw001ROIJ2v4&usqp=CAU','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgmnDR-ZYjj0K-rsDUYb9iy4_c1s9NWlFOWiE8KdzcitHc_BI4hCzsuLMDemvsXtEUHz8&usqp=CAU','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBa8UCK9j7JqPRxI73nR1YL8aGEvAGN8EiVzEZzFC0LfCsYcFFnvK_EX97tf_FmvX6cjQ&usqp=CAU','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHXEa_fGVdLj6ml0-3A4fJqFRyLTE16myUC-oNkIXUrfMvgvQw3VMHvkEJyf6HR6dN-WY&usqp=CAU']
    setInterval(() => {
        for (let i=0 ;i<Productimages.length; i++){
            return Productimages[i]
        }
    }, 5000);
    return <>
        <div className="flex w-full h-screen">
            <div className="mx-auto my-auto ">
                <div className="w-1100 grid grid-flow-col ">
                    <div className="bg-red-200">
                        <div>small vartical corner</div>
                        <img src=""/>
                    </div>
                    <div className="bg-yellow-200">details tab</div>
                </div>
            </div>
        </div>
    </>

}

export default Quickview;