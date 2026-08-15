import Link from "next/link";
import { logout } from "./(auth)/actions";
import { Plus, User, ListCollapse, LogOut } from 'lucide-react';
import { getTrips } from "./trips/actions";

export default async function Home(){

  const trips = await getTrips()
  console.log(trips)

  return(
    <div className="flex flex-col w-full h-screen">
      <div className="absolute top-2 right-2">
        <form action={logout}>
          <button><LogOut/></button>
        </form>
      </div>
      <div className="w-full flex min-h-0 flex-col gap-3 p-8 overflow-y-auto">
        {trips?.map(trip => (
          <div key={trip.id} className="flex flex-col h-60 border-1 border-gray-400 rounded-sm w-2/3 p-2">
            <span className="text-2xl">{trip.name}</span>
            <span className="text-sm ">No action yet..</span>
          </div>
        ))}
      </div>
      <div className="w-full flex items-center justify-center border-1 border-black p-2">
        <div className="flex w-3/4 justify-between">
          <button>
            <Link href="/">
              <ListCollapse/>
            </Link>
          </button>
          <button>
            <Link href="/trips/new">
              <Plus size="45"/>
            </Link>
          </button>
          <button>
            <Link href="/profile">
              <User/>
            </Link>
          </button>
        </div>
      </div>
    </div>
    
  )
}