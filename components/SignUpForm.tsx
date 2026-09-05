'use client'

import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { signup, SignUpState } from '../app/(auth)/actions'  
import Link from 'next/link'

const initialState: SignUpState = { error: null }

export default function SignUpForm() {
  const [state, formAction, pending] = useActionState(signup, initialState)

  useEffect(() => {
    if (state.error) toast.error(state.error)
  }, [state.error])

  return (
    <form action={formAction}>
       <div className="flex flex-col justify-center items-center sm:m-7">
            <div className="w-2/3 lg:w-1/2">
                <div className="flex gap-2 mb-1 text-black">
                    <div className="flex flex-col">
                        <label>First name</label>
                        <input className="w-full border-1 rounded-md p-1 ps-2 text-gray-600" id="first_name" name="first_name" type="text" required/>
                    </div>
                    <div className="flex flex-col">
                        <label>Last name</label>
                        <input className="w-full border-1 rounded-md p-1 ps-2 text-gray-600" id="last_name" name="last_name" type="text" required/>
                    </div>
                </div>
                <div className="flex flex-col mb-1 text-black">
                    <label>Email</label>
                    <input className="border-1 rounded-md p-1 ps-2 text-gray-600" id="email" name="email" type="text" required/>
                </div>
                <div className="flex flex-col mt-1 text-black">
                    <label>Password</label>
                    <input className="border-1 rounded-md p-1 ps-2 text-gray-600" id="password" name="password" type="password" required/>
                </div>
                <div className="flex flex-col mb-1 text-black">
                    <label>Confirm Password</label>
                    <input className="border-1 rounded-md p-1 ps-2 text-gray-600" id="confirmPassword" name="confirmPassword" type="password" required/>
                </div>
            </div>
            <button className="text-white bg-black hover:cursor-pointer mt-4 px-2 py-1 border-1 rounded-sm" type="submit">
                Sign Up
            </button>
            <span className="mt-8 mb-2"> Already have an account? <Link href="/signin"> <span className="hover:cursor-pointer text-gray-700 font-semibold">Sign In</span> </Link> </span>
        </div>
    </form>
  )
}