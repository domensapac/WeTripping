'use client'

import { deleteAccount, logout } from "@/app/(auth)/actions"
import AvatarSection from "@/components/AvatarSection";
import { Mail, Phone, User, Info  } from "lucide-react";
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
                    <div ref={wrapperRef} className="p-3 border-1 border-gray-300 w-[70%] h-50 relative z-70 bg-white rounded-sm shadow-xs">
                        <div className="flex flex-col m-2 justify-center">
                            <div className="w-full flex justify-center">
                                <Info height={40} strokeWidth={2} color="red" />
                            </div>
                            <div className="w-full flex flex-col text-center">
                                <span className="text-xl font-medium">Are you sure?</span>
                                <span className="text-sm text-gray-500">This action cannot be undone.</span>
                            </div>
                            <div className="flex justify-center items-center mt-6 gap-2">
                                <button className="py-1.5 px-1 w-20 text-center text-black bg-gray-200 hover:cursor-pointer px-1 rounded-md shadow-xs" onClick={() => setShown(false)}>Cancel</button>
                                <form action={deleteAccount}>
                                    <button className="py-1.5 px-1 w-20 text-center text-white bg-red-500 hover:cursor-pointer px-1 rounded-md shadow-xs">Delete</button>
                                </form>
                            </div>
                        </div>
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
            <div className="flex flex-col p-4 border-1  rounded-lg shadow-xs gap-6 my-7">
                <div className="text-sm flex items-center">
                    <User strokeWidth={1} className="w-15"/>
                    <div className="flex flex-col w-full">
                        <span className="text-gray-500">About me</span>
                        <span className="font-medium">{data?.first_name} {data?.last_name}</span>
                    </div>
                </div>
                <div className="text-sm flex items-center">
                    <Phone strokeWidth={1} className="w-15"/>
                    <div className="flex flex-col w-full">
                        <span className="text-gray-500">Mobile number</span>
                        <span className="font-medium">/</span>
                    </div>
                </div>
                <div className="text-sm flex items-center">
                    <Mail strokeWidth={1} className="w-15"/>
                    <div className="flex flex-col w-full">
                        <span className="text-gray-500">Email</span>
                        <span className="font-medium">{data?.email}</span>
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
                        <span className="font-medium">{length}</span>
                    </div>
                </div>
                <div className="text-sm flex items-center">
                    <div className="flex flex-col w-full">
                        <span className="text-gray-500">Joined on</span>
                        <span className="font-medium">{format(data?.created_at, "LLLL dd, yyyy")} </span>
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
                            <button className=" font-medium">Log out</button>
                        </form>
                    </div>
                </div>
                <div className="text-sm flex items-center">
                    <div className="flex flex-col w-full">
                        <span className="font-medium">Help</span>
                    </div>
                </div>
                <div className="text-sm flex items-center">
                    <div className="flex flex-col">
                        <button onClick={() => setShown(true)}>
                            <span className="font-medium">Delete account</span>
                        </button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}