'use client'

import { logout } from "@/app/(auth)/actions"
import AvatarSection from "@/components/AvatarSection";
import { Mail, Phone, User } from "lucide-react";
import { format } from "date-fns"
import { useEffect, useRef, useState } from "react";

type Data = {
    id:string,
    first_name:string,
    last_name:string,
    created_at:string,
    img_path:string,
    email:string
}

type Props = {
    data: Data,
    length:number
}

export default function ProfilePage({data, length}: Props ){

    const [shown, setShown] = useState<boolean>(false)
    
    const wrapperRef = useRef(null);
    function useOutsideAlerter(ref:any) {
        useEffect(() => {
            function handleClickOutside(event:any) {
            if (ref.current && !ref.current.contains(event.target)) {
                setShown(false)
            }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    useOutsideAlerter(wrapperRef);


    return( 
        
        <div className="w-full flex flex-col m-8">
            {shown === true ? 
            <>
                <div className="fixed inset-0 w-full flex justify-center z-50 items-center">
                    <div ref={wrapperRef} className="p-8 border-1 border-gray-300 w-[70%] h-40 relative z-70 bg-white rounded-sm shadow-xs">
                        <button onClick={() => setShown(false)}>Cancel</button>
                        <button>Delete</button>
                    </div>
                </div>
            </>
            :
            <>
            </>}
            <div className={`${shown === true ? " blur-xs": " "} flex flex-col`}>
            <div className="relative flex w-full justify-center items-center mt-2 mb-5">
                <span className="font-semibold md:hidden">Profile</span>
            </div>
            <div className="flex justify-center items-center w-full mt-5">
                <div className="">
                    <AvatarSection/>
                </div>
            </div>
            <div className="flex flex-col p-4 border-1 border- rounded-lg shadow-xs gap-6 my-7">
                <div className="text-sm flex items-center">
                    <User strokeWidth={1} className="w-15"/>
                    <div className="flex flex-col w-full">
                        <span className="text-gray-500">About me</span>
                        <span>{data?.first_name} {data?.last_name}</span>
                    </div>
                </div>
                <div className="text-sm flex items-center">
                    <Phone strokeWidth={1} className="w-15"/>
                    <div className="flex flex-col w-full">
                        <span className="text-gray-500">Mobile number</span>
                        <span>/</span>
                    </div>
                </div>
                <div className="text-sm flex items-center">
                    <Mail strokeWidth={1} className="w-15"/>
                    <div className="flex flex-col w-full">
                        <span className="text-gray-500">Email</span>
                        <span>{data?.email}</span>
                    </div>
                </div>
            </div>
            <div className="mt-5 mb-3">
                <span className="text-xl font-semibold">My stats</span>
            </div>
            <div className="flex flex-col p-4 border-1 border-gray-200 rounded-lg shadow-xs gap-4">
                <div className="text-sm flex items-center">
                    <div className="flex flex-col w-full">
                        <span className="text-gray-500">Trips</span>
                        <span>{length}</span>
                    </div>
                </div>
                <div className="text-sm flex items-center">
                    <div className="flex flex-col w-full">
                        <span className="text-gray-500">Joined on</span>
                        <span>{format(data?.created_at, "LLLL dd, yyyy")} </span>
                    </div>
                </div>
            </div>
            <div className="mt-5 mb-3">
                <span className="text-xl font-semibold">Actions</span>
            </div>
            <div className="flex flex-col p-4 border-1 border-gray-200 rounded-lg shadow-xs gap-4">
                <div className="text-sm flex items-center">
                    <div className="flex flex-col w-full">
                        <form action={logout}>
                            <button className="text-gray-500">Log out</button>
                        </form>
                    </div>
                </div>
                <div className="text-sm flex items-center">
                    <div className="flex flex-col w-full">
                        <span className="text-gray-500">Help</span>
                    </div>
                </div>
                <div className="text-sm flex items-center">
                    <div className="flex flex-col">
                        <button onClick={() => setShown(true)}>
                            <span className="text-gray-500">Delete account</span>
                        </button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}