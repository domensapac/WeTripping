import { getUserData, logout } from "@/app/(auth)/actions"
import AvatarSection from "@/components/AvatarSection";
import { LogOut, Mail, Phone, User } from "lucide-react";
import { format } from "date-fns"

export default async function Profile() {
    

    const data = await getUserData()

    return( 
        <div className="w-full flex flex-col m-8">
             <div className="absolute top-2 right-2">
                <form action={logout}>
                <button><LogOut/></button>
                </form>
            </div>
            <div className="relative flex w-full justify-center items-center mt-2 mb-5">
                <span className="font-semibold">Profile</span>
            </div>
            <div className="flex justify-center items-center w-full mt-8">
                <div className="">
                    <AvatarSection/>
                </div>
            </div>
            <div className="flex flex-col p-4 border-1 border-gray-200 rounded-sm shadow-sm gap-6 my-7">
                <div className="text-sm flex items-center">
                    <User strokeWidth={1} className="w-20"/>
                    <div className="flex flex-col w-full">
                        <span className="text-gray-500">About me</span>
                        <span>{data?.first_name} {data?.last_name}</span>
                    </div>
                </div>
                <div className="text-sm flex items-center">
                    <Phone strokeWidth={1} className="w-20"/>
                    <div className="flex flex-col w-full">
                        <span className="text-gray-500">Mobile number</span>
                        <span>/</span>
                    </div>
                </div>
                <div className="text-sm flex items-center">
                    <Mail strokeWidth={1} className="w-20"/>
                    <div className="flex flex-col w-full">
                        <span className="text-gray-500">Email</span>
                        <span>domen.sapac10@gmail.com</span>
                    </div>
                </div>
            </div>
            <div className="mt-5 mb-3">
                <span className="text-2xl font-semibold">My stats</span>
            </div>
            <div className="flex flex-col p-4 border-1 border-gray-200 rounded-sm shadow-sm gap-4">
                <div className="text-sm flex items-center">
                    <div className="flex flex-col w-full">
                        <span className="text-gray-500">Trips</span>
                        <span>0</span>
                    </div>
                </div>
                <div className="text-sm flex items-center">
                    <div className="flex flex-col w-full">
                        <span className="text-gray-500">Joined on</span>
                        <span>{format(data?.created_at, "LLLL dd, yyyy")} </span>
                    </div>
                </div>
            </div>
        </div>
    )
}