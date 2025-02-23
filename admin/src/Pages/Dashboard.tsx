import { useNavigate } from "react-router"
import Appbar from "../Component/Appbar"


export const Dashboard = () => {
    const navigate = useNavigate();
function ChangeMove(url :string){
    navigate(url)
}
return (
    <div>
        <Appbar/>
        <div>
            <div>
                <button onClick={()=>{ChangeMove("/addproduct")}}>addc product</button>
                <button onClick={()=>{ChangeMove("/updateproduct")}}> update  product details </button>
                <button onClick={()=>{ChangeMove("/deleteproduct")}}>delete product</button>
            </div>
        </div>
    </div>
)
}

export default Dashboard
