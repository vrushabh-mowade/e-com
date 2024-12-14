import Appbar from "../Components/Appbar";
import Productcard from "../Components/Productcard";

const Homepage = () => {
    return <>
        <Appbar />
        <div id="section"></div>
        <div className="flex flex-row w-full">
            <div id="filter-section" className="w-96  bg-yellow-500"> 1</div>
            <div id="product-section" className="w-1100 ">
                <Productcard/>
                <Productcard/>
                <Productcard/>
                <Productcard/>
                <Productcard/>
                <Productcard/>          
            </div>
            <div id="empty-section" className="w-96 bg-yellow-500">3</div>
        </div>
    </>

}

export default Homepage;
