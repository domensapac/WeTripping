import Link from 'next/link'
import { signup } from '../actions'
import { Toaster } from 'sonner'
import ErrorToast from '@/components/ErrorToast'


export default async function SignUp({
    searchParams,
}: {
    searchParams: Promise<{ error?: string }>
}) {
    const params = await searchParams
    const error = params.error
    
    return (
        <div>
            <form action={signup}>
                <span className="flex text-3xl p-3 mb-8 w-full justify-center text-black"> Sign Up </span>
                <div className="flex justify-center items-center ">
                    <span className="hover:bg-[#F9EFE1] hover:border-gray-300 border-1 flex rounded-sm p-1 hover:cursor-pointer items-center me-1 text-gray-700"> 
                        <svg className="p-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="18px" height="18px">
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                            <path fill="#4285F4" d="M46.5 24c0-1.61-.15-3.16-.42-4.69H24v9.09h12.75c-.55 2.87-2.16 5.31-4.6 6.96l7.19 5.57C43.53 36.31 46.5 30.73 46.5 24z"/>
                            <path fill="#FBBC05" d="M10.54 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.98-6.19z"/>
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.19-5.57c-1.99 1.33-4.55 2.13-7.7 2.13-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                        </svg>
                        Google 
                    </span>
                    <span className="hover:bg-[#F9EFE1] hover:border-gray-300 border-1 flex rounded-sm p-1 hover:cursor-pointer items-center ms-1 text-gray-700"> 
                        <svg className="p-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="18px" height="18px">
                            <path fill="#1877F2" d="M48,24A24,24,0,1,0,20.25,47.75V31H14.13V24h6.12V18.62c0-6,3.58-9.38,9.11-9.38a37.07,37.07,0,0,1,5.4.47v5.94H31.73c-3,0-3.89,1.86-3.89,3.77V24h6.69l-1.07,7H27.84V47.75A24,24,0,0,0,48,24Z"/>
                        </svg>
                        Facebook 
                    </span>
                </div>
                <div className="flex items-center my-6 w-2/3 md:w-1/2 mx-auto text-gray-300">
                    <div className="flex-1 border-t border-gray-300"></div>
                    <span className="px-3 text-sm text-gray-400">OR</span>
                    <div className="flex-1 border-t border-gray-300"></div>
                </div>
                <div className="flex flex-col justify-center items-center sm:m-7">
                    <div className="w-2/3 lg:w-1/2">
                        <div className="flex flex-col mb-1 text-black">
                            <label>Email</label>
                            <input className="border-1 rounded-md p-1 text-gray-600" id="email" name="email" type="text" required/>
                        </div>
                        <div className="flex flex-col mt-1 text-black">
                            <label>Password</label>
                            <input className="border-1 rounded-md p-1 text-gray-600" id="password" name="password" type="password" required/>
                        </div>
                        <div className="flex flex-col mb-1 text-black">
                            <label>Confirm Password</label>
                            <input className="border-1 rounded-md p-1 text-gray-600" id="conf_password" name="conf_password" type="password" required/>
                        </div>
                    </div>
                    <button className="text-black hover:cursor-pointer mt-4 px-2 py-1 border-1 rounded-sm" type="submit">
                        Sign Up
                    </button>
                    <span className="mt-8 mb-2"> Already have an account? <Link href="/signin"> <span className="hover:cursor-pointer text-gray-700 font-semibold">Sign In</span> </Link> </span>
                </div>
                <Toaster />
                <ErrorToast error={error} />
            </form>
        </div>
      );
}