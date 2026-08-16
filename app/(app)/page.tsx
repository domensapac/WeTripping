import Link from "next/link";
import { getTrips } from "./trips/actions";

export default async function Home(){

  const trips = await getTrips()

  return(
   <div className="flex flex-col w-full gap-3 p-8 ">
      {trips?.map(trip => (
        <div key={trip.id} className="flex flex-col h-60 border-1 border-gray-400 rounded-sm w-2/3 p-2">
          <span className="text-2xl">{trip.name}</span>
          <span className="text-sm ">No action yet..</span>
        </div>
      ))}
    </div>
  )
}