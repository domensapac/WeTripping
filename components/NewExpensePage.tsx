'use client'

import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { addExpense } from '../app/(app)/trip/actions'  


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


export default function NewExpensePage({trip, travellers} : TripProps){
    const pathname = usePathname()
    const id = pathname.split('/')[2]

    const refHref = `/trip/${id}`

    return(
        <div className={`flex flex-col w-full gap-2 m-8 relative`}>  
            <div className="relative flex w-full justify-center mt-2 mb-5">
                <Link href={refHref}> <span className="absolute right-0"><X/> </span></Link>
                <span className="font-semibold">Add expense</span>
            </div> 
            <form action={addExpense} className="my-auto">
                <div className="flex flex-col p-4 border-1 border-gray-200 rounded-sm shadow-sm gap-4">
                        <input type="text" className="hidden" defaultValue={trip?.id} name="id" id="id"></input>
                        <span className="text-gray-500">Amount</span>
                        <input type="text" className="w-30 border-1" name="amount" id="amount"></input>
                        <span className="text-gray-500">Description</span>
                        <input type="text" className="w-30 border-1" name="description" id="description"></input>
                        <span className="text-gray-500">Paid by</span>
                        <select name="paid_by" id="paid_by" className="w-40">
                            {travellers?.map(traveller => (
                                <option key={traveller.id} value={traveller.id}>{traveller.first_name} {traveller.last_name}</option>
                            ))}
                        </select>
                        <button className="border-1 rounded-sm bg-black text-white w-20 h-10">Finish</button>
                </div>
            </form>

        </div>
    )
}