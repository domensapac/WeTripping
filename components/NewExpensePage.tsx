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
                <span className="font-semibold md:hidden">Add expense</span>
            </div> 
            <form action={addExpense} className="my-auto">
                <div className="flex flex-col p-4 border-1 border-gray-200 rounded-sm shadow-sm gap-5">
                    <input type="text" className="hidden" defaultValue={trip?.id} name="id" id="id"></input>
                    <div className="flex flex-col gap-1 relative">
                        <span className="text-lg font-medium">Amount</span>
                        <input type="text" className="border-1 rounded-md p-1 ps-2 " name="amount" id="amount"></input>
                        <span className="text-gray-500 absolute right-0 top-1/2 -translate-x-1/2 translate-y-1/5">€</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-lg font-medium">Description</span>
                        <input type="text" className="border-1 rounded-md p-1 ps-2 " name="description" id="description"></input>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-lg font-medium">Person who paid</span>
                        <select name="paid_by" id="paid_by" className="border-1 rounded-md p-1 ps-2 ">
                            {travellers?.map(traveller => (
                                <option key={traveller.id} value={traveller.id}>{traveller.first_name} {traveller.last_name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-center">
                        <button className="border-1 rounded-sm bg-black text-white w-30 h-10">Finish</button>
                    </div>
                </div>
            </form>

        </div>
    )
}