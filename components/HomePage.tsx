'use client'

import Link from "next/link";
import { Bell, LayoutGrid, User, Search} from 'lucide-react';
import { format } from "date-fns";
import { useState } from "react";

type Trip = {
    id: string,
    created_at: Date
    name: string,
    start_date: Date,
    end_date: Date,
    created_by : {
        first_name: string,
        last_name: string
    }
}

type TripsSectionProps = {
  trips: Trip[] | null;
};

export default function HomePage({trips} : TripsSectionProps){

    const [view, setView] = useState('grid')

    return(
    <div className={`flex flex-col w-full gap-3 m-8`}>
      <div className="flex w-full justify-between items-center mt-2 mb-5">
        <button className="hover:cursor-pointer" onClick={()=> setView(view === 'list' ? 'grid' : 'list')}><LayoutGrid/></button>
        <span className="font-semibold">Home</span>
        <Bell className="fill-black"/>
      </div>
      <div className="flex flex-col w-full rounded-sm h-30 relative shrink-0 mt-2">
        <span className="text-2xl font-semibold">No more calculating</span>
        <span className="text-sm w-3/4">You just enter your expenses, we do everything else for you</span>
        <div className="absolute right-5 top-8 w-20">
          <img src="/icon1.svg" alt="iconsvg" className="opacity-60"></img>
        </div>
      </div>
      <div className="relative mt-2">
        <input type="text" id="search" name="search" className="peer p-3 border-1 border-gray-200 rounded-sm shadow-sm w-full h-12 focus:shadow-md"></input>
        <span className="peer-focus:invisible pointer-events-none text-gray-500 relative -top-9 left-3 flex gap-2 items-start"><Search/> Search for trip</span>
      </div>
      <div>
        <span className="text-lg font-semibold">My Trips</span>
      </div>
      <div className={`w-full ${view === 'list' ? "flex flex-col gap-4" : "grid grid-cols-2 gap-3"}`}>
        {trips?.map(trip => (
          <Link key={trip.id} href={`/trip/${trip.id}`}>
            <div className={`shrink-0 flex flex-col min-h-30 border-1 border-gray-200 rounded-sm p-2 shadow-sm relative ${view === 'list' ? "w-full" : "col-span-1"}`}>
                <span className={`flex w-full ${view === 'list' ? "justify-between items-baseline" : "flex-col"}`}>
                <span className={`text-2xl`}>{trip.name}</span>
                <span className={`${view === 'list' ? "text-md" : "text-sm"}`}>
                    {format(trip.start_date, "dd.MM")} - {format(trip.end_date, "dd.MM")}
                </span>
                </span> 
                <span className="text-sm ">No action yet..</span>
                <span className="absolute bottom-2 right-2 text-xs flex gap-1 items-center text-gray-500"> 
                <User size={10}/>
                <span>{trip.created_by.first_name} {trip.created_by.last_name} </span>
                </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
    )
}