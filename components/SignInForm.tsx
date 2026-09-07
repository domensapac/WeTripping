'use client'

import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { login, SignInState } from '../app/(auth)/actions'  
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const initialState: SignInState = { error: null }

export default function SignInForm() {
  const [state, formAction, pending] = useActionState(login, initialState)
  const searchParams = useSearchParams()
  const search = searchParams.get('redirectTo')

  console.log(searchParams)

  useEffect(() => {
    if (state.error) toast.error(state.error)
  }, [state.error])

  return (
    <form action={formAction}>
        <div className="flex flex-col justify-center items-center sm:m-7 ">
            <div className="w-[80%] lg:w-1/2">
                <div className="flex flex-col text-black">
                    <label className="font-medium">Email</label>
                    <input className="border-1 rounded-md p-2 text-gray-600 text-sm" id="email" name="email" type="text" required/>
                </div>
                <div className="flex flex-col mt-4 text-black">
                    <label className="font-medium">Password</label>
                    <input className="border-1 rounded-md p-2 text-gray-600 text-sm" id="password" name="password" type="password" required/>
                </div>
                <div className="my-2">
                    <Link href="/reset-password"> <span className="hover:underline text-gray-600 text-xs"> Forgotten your password?</span></Link>
                </div>
                <button className="w-full font-medium text-white border-white bg-[#1B6BFF] hover:cursor-pointer mt-4 px-2 py-2 border-1 rounded-full shadow-md" type="submit">
                Sign In
                </button>
            </div>
            <span className="mt-3 mb-6 text-xs">Don't have an account? <Link href="/signup"> <span className="hover:cursor-pointer text-gray-700 font-semibold">Sign up</span> </Link> </span>
            <input type="text" hidden name="redirectTo" id="redirectTo" defaultValue={search || " "}></input>
        </div>
    </form>
  )
}