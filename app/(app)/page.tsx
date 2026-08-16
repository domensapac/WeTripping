import Link from "next/link";
import { getTrips } from "./trips/actions";
import { Bell, LayoutGrid, Crown, Search} from 'lucide-react';

export default async function Home(){

  const trips = await getTrips()
  console.log(trips)

  return(
   <div className="flex flex-col w-full gap-3 m-8 ">
      <div className="flex w-full justify-between items-center mt-2 mb-5">
        <LayoutGrid/>
        <span className="font-semibold">Home</span>
        <Bell className="fill-black"/>
      </div>
      <div className="relative">
        <input className="border-1 border-gray-200 rounded-sm shadow-sm w-full h-12"></input>
        <Search className="relative -top-9 left-3"/>
      </div>
      {trips?.map(trip => (
        <div key={trip.id} className="flex flex-col min-h-30 border-1 border-gray-200 rounded-sm w-full p-2 shadow-sm relative">
          <span className="text-2xl">{trip.name}</span>
          <span className="text-sm ">No action yet..</span>
          <span className="absolute bottom-2 right-2 text-xs flex gap-1 items-center text-gray-500"> 
            <Crown size={10}/>
            <span>{trip.created_by.first_name} {trip.created_by.last_name} </span>
          </span>
        </div>
      ))}
    </div>
  )
}