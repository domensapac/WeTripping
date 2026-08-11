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
            <div className="flex m-6 w-90 h-72 flex-col border-1 rounded-sm justify-center items-center bg-white">
                <div className="text-3xl">
                    <span className="ms-3">Trip created!</span>
                </div>
                <div className="my-2 text-xl">
                    <span> {destination} </span>
                    <span className="text-blue-500"> {dates?.from && dates?.to ? `${format(dates.from, "yy")}` : "Ni izbranih datumov"} </span>
                </div>
                <div className="my-2">
                    <span>Now let's invite your friends</span>
                </div>
                <div className="my-2 flex flex-col">
                    <span className="text-xs">Invite by link</span>        
                    <div className="flex items-center border-1">
                        <span className="w-60 text-xs truncate">{inviteLink}</span>
                        <Copy className="hover:cursor-pointer active:scale-85" onClick={handleCopy}/>
                    </div>
                </div>
                <Link href="/">
                    <div className="mt-5 border-1 p-2 rounded-sm mt-5">
                        <House />
                    </div>
                </Link>
            </div>
        </div>
    )
}