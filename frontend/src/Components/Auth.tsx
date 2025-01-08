import { ChangeEvent, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { signuptype } from '../zod';
import axios from "axios" ;
import { BACKEND_URL } from "../config";



export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const nagivate = useNavigate();
    const [postInput, setpostInput] = useState<signuptype>({
        name: "",
        email: "",
        password: ""
    })

async function postRequest() {

    try{
        const response = await axios.post(`${BACKEND_URL}/user/${type==="signup"? "signup" : "signin"}`, postInput )
        const token = response.data;
        localStorage.setItem("token","Bearer " + token);
        console.log("auth token is",token);
        nagivate("/");

    }catch(err :unknown){
        if (err instanceof Error) {
            // TypeScript now knows that 'err' is an instance of Error
            console.error("Error message:", err.message);
            alert("backend is down 1");
        } else {
            // In case the error is not an instance of Error
            console.error("Unknown error:", err);
            alert("backend is down 2");
        }
        
    }
}
    return <>
        <div className='h-screen flex justify-center flex-col'>
            <div className="flex justify-center boxshadow">
                <div className="max-w-lg ">
                    <div className="px-10">
                        <div className="text-4xl font-extrabold">
                            Create an account
                        </div>
                        <div className="max-w-md  text-slate-400 text-center py-4 ">
                            {type === "signup"? "Already have a account ?" : "Do not have a account ?"}
                            <Link className="pl-2 underline" to={type === "signup"? "/signin" : "/Signup"}> {type === "signup"? "signin" : "Signup"} </Link>
                        </div>
                    </div>
                    <div className="py-2">
                    {type=== "signup"? <Labelledinput label="First Name" placeholder="vrushabh" onchange={(e) => {
                            setpostInput({
                                ...postInput,
                                name: e.target.value
                            })
                        }} /> : null
                    }
                    </div>
                    <div className="py-2">
                        <Labelledinput label="User Name" placeholder="vrushabhmowade@gmail.com" onchange={(e) => {
                            setpostInput({
                                ...postInput,
                                email: e.target.value
                            })
                        }} />
                    </div>
                    <div className="py-2">
                        <Labelledinput label="Password" type={"password"} placeholder="1234456" onchange={(e) => {
                            setpostInput({
                                ...postInput,
                                password: e.target.value
                            })
                        }} />
                    </div>
                    <button onClick={postRequest} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup"? "Sign up" : "Sign in"}</button>
                </div>
            </div>
        </div>
    </>
}



interface Labelledinputtype {
    label: string,
    placeholder: string,
    onchange: (e: ChangeEvent<HTMLInputElement>) => void,
    type?: string
}

const Labelledinput = ({ label, placeholder, onchange, type }: Labelledinputtype) => {

    return (<>
        <div>
            <label className="block mb-2 text-sm font-semibold text-gray-900 text-black pt-3">{label}</label>
            <input onChange={onchange} type={type || "text"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />
        </div>
    </>)



}