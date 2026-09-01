'use client'

import { MoveLeft, User } from "lucide-react"
import Link from "next/link"
import ExpenseButton from "./ExpenseButton"

type Trip = {
    id: number,
    created_at: string,
    name: string,
    start_date: string,
    end_date: string,
    created_by: string
}

type User = {
    id: string,
    first_name: string,
    last_name: string,
    created_at: string,
    img_path: string
}

type TripProps = {
    trip: Trip | null,
    travellers: User[] | null
}

export default function TripPage( {trip, travellers} : TripProps){

    const numberOfTravellers = travellers?.length

    return(
        <div className={`flex flex-col w-full gap-2 m-8 relative`}>  
            <div className="relative flex w-full justify-center mt-2 mb-5">
                <Link href="/"> <span className="absolute left-0"><MoveLeft/> </span></Link>
                <span className="font-semibold">Trip</span>
            </div> 
            <div className="flex flex-col gap-2 mt-3">
                <span className="text-3xl">{trip?.name}</span> 
                <button className="border-1 rounded-lg p-[3px] text-sm w-20 text-gray-500">{numberOfTravellers} joined </button>
            </div>
            <div className="mt-5 mb-1">
                <span className="text-xl">History</span>
            </div>
            <div className="flex flex-col p-4 border-1 border-gray-200 rounded-sm shadow-sm gap-4">
                lorem ipsum
            </div>
            <div className="mt-5 mb-1">
                <span className="text-xl">Travellers</span>
            </div>
            <div className="flex flex-col p-4 border-1 border-gray-200 rounded-sm shadow-sm gap-4">
                {travellers?.map(traveller => (
                    <div className="flex flex-col" key={traveller.id}>
                        <div className="flex items-center text-sm">
                            <span className="mx-2">
                                {traveller.img_path !== '' ? 
                                    <img className="w-6 h-6 object-cover rounded-full" alt="avatar" src={traveller.img_path}/> :
                                    <User strokeWidth={1} className="w-6 h-6" />}
                            </span>
                            <span className="text-gray-800">{traveller.first_name} {traveller.last_name}</span>
                            <span className="ml-auto">You owe...</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}