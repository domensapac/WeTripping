'use client'

import { DateRange } from 'react-day-picker';
import { format } from "date-fns";
import { House } from 'lucide-react';
import Link from 'next/link'
import { Copy } from 'lucide-react';

type PropType = {
    destination : string; 
    dates : DateRange | undefined;
    inviteLink : string;
}

export default function SuccessPage({destination, dates, inviteLink} : PropType){

    function handleCopy() {
        navigator.clipboard.writeText(inviteLink);
    }

    return (
        <div className="tracking-[1px] flex w-full text-black">
            <div className="flex m-6 w-90 h-72 flex-col border-1 border-gray-200 shadow-sm rounded-sm justify-center items-center bg-white">
                <div className="text-3xl">
                    <span className="ms-3">Trip created!</span>
                </div>
                <div className="my-2 text-xl">
                    <span> {destination} </span> -
                    <span className="text-[#1B6BFF]"> {dates?.from && dates?.to ? `${format(dates.from, "yy")}` : "Ni izbranih datumov"} </span>
                </div>
                <div className="my-2">
                    <span>Now let's invite your friends</span>
                </div>
                <div className="mt-4 flex flex-col w-full px-3">
                    <span className="text-xs">Invite by link</span>        
                    <div className="w-full flex items-center text-xs gap-2">
                        <span className="grow truncate border-1 rounded-md p-2 text-gray-600 text-sm">{inviteLink}</span>
                        <button className={`${inviteLink === "" ? "bg-indigo-100" : "bg-[#0d3978]"} text-sm font-medium text-white hover:cursor-pointer px-3 py-2  rounded-full shadow-xs`} onClick={handleCopy}> <Copy className="h-full p-1 hover:cursor-pointer group-active:scale-85"/> </button>
                    </div>
                </div>
            </div>
        </div>
    )
}