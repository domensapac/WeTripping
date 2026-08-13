'use client'

import { useActionState, useEffect } from "react";
import { resetPassword, ResetPasswordState } from "../actions";
import { toast } from "sonner";

const initialState: ResetPasswordState = { error: null, success : false }

export default function ResetPassword(){
    const [state, formAction, pending] = useActionState(resetPassword, initialState)

    useEffect(() => {
        if (state.error) toast.error(state.error)
        if(state.success) toast.success("Reset link sent to your email")
    }, [state.error, state.success])

    return(
        <div>
            <form action={formAction}>
                <span className="flex text-3xl p-3 mb-8 w-full justify-center text-black"> Reset your password </span>
                <div className="flex flex-col justify-center items-center sm:m-7 ">
                    <div className="w-2/3 lg:w-1/2">
                        <div className="flex flex-col mt-1 text-black">
                            <label>Email</label>
                            <input className="border-1 rounded-md p-1 ps-2 text-gray-600" id="email" name="email" type="email" required/>
                        </div>
                    </div>
                    <button className="text-black hover:cursor-pointer mt-7 px-2 py-1 border-1 rounded-sm" type="submit">Confirm</button>
                </div>
            </form>
        </div>
    )
}