'use client'

import { MoveLeft } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
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
        <div className={`flex flex-col w-full gap-5 m-8 relative`}>  
            <div className="relative flex w-full justify-center mt-2 mb-5">
                <Link href="/"> <span className="absolute left-0"><MoveLeft/> </span></Link>
                <span className="font-semibold">Trip</span>
            </div> 
            <div className="flex flex-col gap-2 mt-3">
                <span className="text-3xl">{trip?.name}</span> 
                <button className="border-1 rounded-lg p-[3px] text-sm w-20">{numberOfTravellers} joined </button>
            </div>
            <div>
                <span className="text-xl">History</span>
            </div>
            <div>
                <span className="text-xl">Travellers</span>
                <div className="ms-8">
                    {travellers?.map(traveller => (
                        <span key={traveller.id}>{traveller.first_name} {traveller.last_name}</span>
                    ))}
                </div>
            </div>
            <ExpenseButton/>
        </div>
    )
}