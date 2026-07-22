import { resetPassword } from "../actions";
import Link from 'next/link'

export default function ResetPassword(){
    return(
        <div>
            <form action={resetPassword}>
                <span className="flex text-3xl p-3 mb-8 w-full justify-center text-black"> Reset your password </span>
                <div className="flex flex-col justify-center items-center sm:m-7 ">
                    <div className="w-2/3 lg:w-1/2">
                        <div className="flex flex-col mt-1 text-black">
                            <label>Email</label>
                            <input className="border-1 rounded-md p-1 text-gray-600" id="email" name="email" type="email" required/>
                        </div>
                    </div>
                    <button className="text-black hover:cursor-pointer mt-7 px-2 py-1 border-1 rounded-sm" type="submit">Confirm</button>
                </div>
            </form>
        </div>
    )
}