import Link from "next/link";
import { getTrips } from "./trips/actions";
import { Bell, LayoutGrid, User, Search} from 'lucide-react';
import { format } from "date-fns";

export default async function Home(){

  const trips = await getTrips()
  console.log(trips)

  
  return(
   <div className="flex flex-col w-full gap-3 m-8">
      <div className="flex w-full justify-between items-center mt-2 mb-5">
        <LayoutGrid/>
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
      <div className="flex flex-col gap-4 ">
        {trips?.map(trip => (
          <div key={trip.id} className="shrink-0 flex flex-col min-h-30 border-1 border-gray-200 rounded-sm w-full p-2 shadow-sm relative">
            <span className="flex justify-between w-full items-baseline ">
              <span className="text-2xl">{trip.name}</span>
              <span className="text-md">
                {format(trip.start_date, "dd.MM")} - {format(trip.end_date, "dd.MM")}
              </span>
            </span> 
            <span className="text-sm ">No action yet..</span>
            <span className="absolute bottom-2 right-2 text-xs flex gap-1 items-center text-gray-500"> 
              <User size={10}/>
              <span>{trip.created_by.first_name} {trip.created_by.last_name} </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}