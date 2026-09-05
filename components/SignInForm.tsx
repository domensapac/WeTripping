'use client'

import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { login, SignInState } from '../app/(auth)/actions'  
import Link from 'next/link'

const initialState: SignInState = { error: null }

export default function SignInForm() {
  const [state, formAction, pending] = useActionState(login, initialState)

  useEffect(() => {
    if (state.error) toast.error(state.error)
  }, [state.error])

  return (
    <form action={formAction}>
        <div className="flex flex-col justify-center items-center sm:m-7 ">
            <div className="w-2/3 lg:w-1/2">
                <div className="flex flex-col mb-1 text-black">
                    <label>Email</label>
                    <input className="border-1 rounded-md p-1 ps-2 text-gray-600" id="email" name="email" type="text" required/>
                </div>
                <div className="flex flex-col mt-1 text-black">
                    <label>Password</label>
                    <input className="border-1 rounded-md p-1 ps-2 text-gray-600" id="password" name="password" type="password" required/>
                </div>
                <div className="my-2">
                    <Link href="/reset-password"> <span className="hover:underline text-gray-600 text-sm"> Forgotten your password?</span></Link>
                </div>
            </div>
            <button className="text-black border-black hover:cursor-pointer mt-4 px-2 py-1 border-1 rounded-sm" type="submit">
                Sign In
            </button>
            <span className="mt-8 mb-2">Don't have an account? <Link href="/signup"> <span className="hover:cursor-pointer text-gray-700 font-semibold">Sign up</span> </Link> </span>
        </div>
    </form>
  )
}