import Appbar from "../Components/Appbar";
import BreadcumSection from "../Components/BreadcumSection";
import CategoryFilter from "../Components/CategoryFilter";
import { ProductCard } from "../Components/Productcard";
import Topproductbar from "../Components/Topproductbar";
import { useProduct } from "../hooks/products";


const Homepage = () => {
    const { products } = useProduct();


    return <>
        <Appbar />
        <BreadcumSection/>
        <div className="grid grid-flow-col auto-cols-max flex flex-row w-full justify-center">
            <div id="filter-section" className="flex flex-col items-center w-[234px] m-5 ">
                <CategoryFilter />
            </div>
            <div>
                <Topproductbar />
                <div id="product-section" className="w-952 grid grid-cols-3">
                    {products.map((product) => (<ProductCard
                        id={product.id}
                        key={product.id}
                        title={product.title}
                        mainImage={product.mainImage}
                        price={product.price}
                        manufacturer={product.manufacturer}
                    />))}
                </div>
            </div>
        </div>
    </>

}

export default Homepage;
