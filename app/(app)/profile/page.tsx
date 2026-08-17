import { logout } from "@/app/(auth)/actions"
import { LogOut } from "lucide-react";

export default function Profile() {
    return( 
        <div className="w-full flex flex-col gap-10 m-8">
             <div className="absolute top-2 right-2">
                <form action={logout}>
                <button><LogOut/></button>
                </form>
            </div>
            <div className="w-full flex justify-center">
                <span className="font-semibold">Profile</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                    <img src="/profile_pic.svg" alt="prof" className="w-30"></img>
                </div>
                <div className="col-span-1 flex flex-col items-center justify-center">
                    <form>
                        <div className="text-sm flex flex-col">
                            <span>First Name</span>
                            <input type="text" name="first_name" id="first_name" className="border-1 border-gray-200 rounded-sm p-1"></input>
                        </div>
                        <div className="text-sm flex flex-col">
                            <span>Last Name</span>
                        <input type="text" name="last_name" id="last_name" className="border-1 border-gray-200 rounded-sm p-1"></input>
                        </div>
                    </form>
                </div>
            </div>
            <div className="flex items-center my-6 w-4/5 md:w-1/2 mx-auto text-gray-300">
                <div className="flex-1 border-t border-gray-300"></div>
            </div>
            <div className="flex flex-col">
                <form>
                    <div className="text-sm flex flex-col">
                        <span>Email</span>
                        <input type="text" name="first_name" id="first_name" className="border-1 border-gray-200 rounded-sm p-1"></input>
                    </div>
                    <div className="text-sm flex flex-col">
                        <span>Password</span>
                        <input type="text" name="last_name" id="last_name" className="border-1 border-gray-200 rounded-sm p-1"></input>
                    </div>
                </form>
            </div>
        </div>
    )
}