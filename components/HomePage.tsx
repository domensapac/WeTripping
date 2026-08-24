'use client'

import Link from "next/link";
import { Bell, LayoutGrid, User, Search, Rows3} from 'lucide-react';
import { format } from "date-fns";
import { useState } from "react";
import NotificationsTab from "./NotificationsTab";

type Notification = {
    id: string,
    created_at: Date
    user_id: string,
    was_read: boolean,
    title: string,
    description: string,
    type: string
}

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

type HomeProps = {
  trips: Trip[] | null,
  notifications: Notification[] | null
};

export default function HomePage({trips, notifications} : HomeProps){

    const [view, setView] = useState('list')
    const [visible, setVisible] = useState<boolean>(false) 

    const numberOfNotifications = notifications?.length

    return(
    <div className={`flex flex-col w-full gap-3 m-8 relative`}>      
      <div className="relative flex w-full justify-center items-center mt-2 mb-5">
        <button className={`absolute left-0 hover:cursor-pointer transition-transform duration-200 active:scale-90`} onClick={()=> setView(view === 'list' ? 'grid' : 'list')}> 
          {view === 'list' ? <LayoutGrid className="transition-transform"/> : <Rows3 className="transition-transform"/>}
        </button>
        <span className="font-semibold">Home</span>
        <Link href="/notifications" className="absolute right-0 hover:cursor-pointer">
          <Bell className="fill-black"/>
          { numberOfNotifications && numberOfNotifications > 0 ? 
          <>
          <span className={`absolute text-center right-1 top-0 h-[14px] w-[14px] rounded-full bg-red-600 -translate-y-1/2 translate-x-1/3 text-white text-[10px]`}>{numberOfNotifications}</span>
          </> : ""}
        </Link>
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
      <div className={`w-full ${view === 'list' ? "flex flex-col h-full gap-4" : "grid grid-cols-2 gap-3"}`}>
        {!trips || trips.length === 0 ? 
        <>
          <div className="flex justify-center items-center w-full h-full">
            <span className="text-xl">No trips yet..</span>
          </div>
        </> :""} 
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