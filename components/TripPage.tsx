'use client'

import { MoveLeft, User, Euro, UserPlus, Share } from "lucide-react"
import Link from "next/link"
import { createInvite } from "@/app/(app)/trip/actions"
import Image from 'next/image'

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

type Expense = {
    id: string,
    trip_id: string,
    amount: number,
    description: string,
    category: string,
    added_by: string,
    paid_by: {
        first_name: string,
        last_name: string
    },
    created_at: string
}

type TripProps = {
    trip: Trip | null,
    travellers: User[] | null,
    expenses: Expense[] | null
}

export default function TripPage({trip, travellers, expenses} : TripProps){

    const numberOfTravellers = travellers?.length

    async function handleInvite() {
        if(!trip) return
        
        const inviteLink = await createInvite(trip?.id); 
        navigator.clipboard.writeText(inviteLink);
    }

    return(
        <div className={`flex flex-col w-full gap-2 m-8 relative`}>  
            <div className="relative flex w-full justify-center mt-2 mb-5">
                <Link href="/"> <span className="absolute left-0"><MoveLeft/> </span></Link>
                <span className="font-semibold">Trip</span>
            </div> 
            <div className="flex flex-col gap-2 mt-3">
                <div className="flex justify-between">
                    <span className="text-3xl">{trip?.name}</span>
                </div>
                <span className="flex items-center border-1 rounded-lg p-[3px] w-12 text-sm text-gray-500"><span><User height={15}/></span> {numberOfTravellers}  </span>
            </div>
            <div className="mt-5 mb-1">
                <span className="text-xl">History</span>
            </div>
            <div className="flex flex-col gap-2">
                {expenses?.map(expense => (
                    <div className="flex items-center p-4 border-1 border-gray-200 rounded-sm shadow-sm gap-4" key={expense.id}>
                        <div>
                            <Euro strokeWidth={1}/>
                        </div>
                        <div className="flex flex-col">
                            <span>{expense.description}</span>
                            <span className="text-gray-600 text-xs">Paid by {expense.paid_by.first_name} {expense.paid_by.last_name}</span>
                        </div>
                        <div className="ml-auto">
                            <span>{expense.amount}€</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-between mt-5 mb-1">
                <span className="text-xl">Travellers</span>
                <button className="active:scale-95 flex items-center border-1 border-gray-400 shadow-sm px-1 rounded-sm text-md" onClick={handleInvite}><Share height={15}/> Invite</button>
            </div>
            <div className="flex flex-col p-4 border-1 border-gray-200 rounded-sm shadow-sm gap-4">
                {travellers?.map(traveller => (
                    <div className="flex flex-col" key={traveller.id}>
                        <div className="flex items-center text-sm">
                            <span className="mx-2">
                                {traveller.img_path !== '' ? 
                                    <Image className="w-6 h-6 object-cover rounded-full" alt="avatar" src={traveller.img_path}/> :
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