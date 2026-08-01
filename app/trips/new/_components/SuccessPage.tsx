'use client'

import { CheckCheck } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { format } from "date-fns";
import { House } from 'lucide-react';
import Link from 'next/link'

type PropType = {
    destination : string; 
    dates : DateRange | undefined
}

export default function SuccessPage({destination, dates} : PropType){
    return (
        <div className="tracking-[1px] flex w-full text-black">
            <div className="flex m-6 w-90 h-72 flex-col border-1 rounded-sm justify-center items-center bg-white">
                <div className="text-3xl">
                    <span className="flex text-center items-center ms-3"> <CheckCheck className="mx-2"/> Trip created!</span>
                </div>
                <div className="my-4 text-xl">
                    <span> {destination}, </span>
                    <span> {dates?.from && dates?.to ? `${format(dates.from, "d. M. yy")} - ${format(dates.to, "d. M. yy")}` : "Ni izbranih datumov"} </span>
                </div>
                <div className="my-4 hover:underline">
                    Invite others
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