import { Auth } from "../Components/Auth"

export const Signup = () => {

    return<> 
    <div className="grid grid-cols-1  lg:grid-cols-2">
        <div>
            <Auth type="signup"/>
        </div>
        <div className="hidden lg:block">
        <div className='bg-gray-200 h-screen flex justify-center flex-col'>
            <div className="flex justify-center">
                <div className="max-w-lg">
                    <div className="text-center text-3xl font-bold">
                        IF you can&apost say something nice.
                        Then say nothing at All !!
                    </div>
                    <div className="max-m-md text-xl font-semibold text-left mt-4">
                        Mr Rabbit
                    </div>
                    <div className="max-m-md font-light text-sm text-slate-400">
                        primary consumer of food chain
                    </div>
                </div>
            </div> 
        </div>
        </div>
    </div>
        </>
}