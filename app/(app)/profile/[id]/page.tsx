

import { MoveLeft, User } from "lucide-react";
import { format } from "date-fns"
import { getTrips, getUserData } from "../../trip/actions";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { headers } from "next/headers";

export default async function ViewProfile({ 
    params 
    }: { 
        params: Promise<{ id: string }> 
    }) {

    const { id } = await params;
    
    console.log(id)
    
    const [data, trips] = await Promise.all([
        getUserData(id),
        getTrips()
    ])
    
    const headerList = await headers();
    const referer = headerList.get("referer");
    
    const backUrl = referer || "/";

    let avatarUrl: string | null = null;

    if (data?.img_path) {
        const supabase = await createClient();
        const { data: imgData } = supabase.storage
        .from("Avatars")
        .getPublicUrl(data.img_path);

        avatarUrl = imgData.publicUrl;
    }
    
    return( 
        <div className="w-full flex flex-col m-8">
            <div className="relative flex w-full justify-center items-center mt-2 mb-5">
                <Link href={backUrl}> <span className="absolute left-0 top-0"><MoveLeft/> </span></Link>
                <span className="font-semibold md:hidden">{data?.first_name}'s profile</span>
            </div>
            <div className="flex justify-center items-center w-full mt-5">
                <div className="">
                    <div className="flex flex-col items-center justify-center">
                        <label className="text-center w-40 h-40 shadow-lg text-center flex justify-center items-center mt-2 border-1 border-gray-400 rounded-full" htmlFor="single">
                            {avatarUrl ? (
                                <img src={avatarUrl} alt="Avatar" className="relative rounded-full w-40 h-40 object-cover"/>
                            ) : (
                                <div><User size={80}/></div>
                            )}
                        </label>
                    </div>
                </div>
            </div>
            <div className="flex flex-col p-4 border-1 border-gray-200 rounded-sm shadow-sm gap-6 my-7">
                <div className="text-sm flex items-center">
                    <User strokeWidth={1} className="w-15"/>
                    <div className="flex flex-col w-full">
                        <span className="text-gray-500">About</span>
                        <span>{data?.first_name} {data?.last_name}</span>
                    </div>
                </div>
            </div>
            <div className="mt-5 mb-3">
                <span className="text-xl font-semibold">Stats</span>
            </div>
            <div className="flex flex-col p-4 border-1 border-gray-200 rounded-sm shadow-sm gap-4">
                <div className="text-sm flex items-center">
                    <div className="flex flex-col w-full">
                        <span className="text-gray-500">Trips</span>
                        <span>{trips?.length}</span>
                    </div>
                </div>
                <div className="text-sm flex items-center">
                    <div className="flex flex-col w-full">
                        <span className="text-gray-500">Created on</span>
                        <span>{format(data?.created_at, "LLLL dd, yyyy")} </span>
                    </div>
                </div>
            </div>
        </div>
    )
}