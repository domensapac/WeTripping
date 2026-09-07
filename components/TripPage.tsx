'use client'

import { MoveLeft, User, Euro, SquareArrowRightExit , Share, EllipsisVertical, Trash, X } from "lucide-react"
import Link from "next/link"
import { createInvite, leaveTrip } from "@/app/(app)/trip/actions"
import { RefObject, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"

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
    const numberOfExpenses = expenses?.length || 0

    async function handleInvite() {
        if(!trip) return
        
        const inviteLink = await createInvite(trip?.id); 
        navigator.clipboard.writeText(inviteLink);
    }


    function useOutsideAlerter(ref:any) {
        useEffect(() => {
            function handleClickOutside(event:any) {
            if (ref.current && !ref.current.contains(event.target)) {
                setShown(false)
            }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    function useOutsideAlerterProfiles(ref:any) {
        useEffect(() => {
            function handleClickOutside(event:any) {
            if (ref.current && !ref.current.contains(event.target)) {
                setProfilesShown(false)
            }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const [profilesShown, setProfilesShown] = useState<boolean>(false)
    const [shown, setShown] = useState<boolean>(false)
    const wrapperRef = useRef(null);
    const wrapperRefProfiles = useRef(null);

    useOutsideAlerter(wrapperRef);
    useOutsideAlerterProfiles(wrapperRefProfiles);

    const router = useRouter();

    async function handleLeave(){
        if(!trip){
            return
        }

        const data = await leaveTrip(trip?.id)
        router.push("/");
    }

    return(
        <div className={`flex flex-col w-full gap-2 m-8 relative`}>  
            {profilesShown === true ? 
            <>
                <div className="fixed inset-0 w-full flex justify-center z-50 items-center">
                    <div ref={wrapperRefProfiles} className="p-4 border-1 border-gray-300 w-[90%] h-90 relative z-70 bg-white rounded-sm shadow-sm">
                        <div className="flex justify-between">
                            <span className="text-xl font-medium">View profiles</span>
                            <button onClick={() => setProfilesShown(!profilesShown)}>
                                <X className=""/>
                            </button>
                        </div>
                        <div className="h-[90%] flex flex-col mt-3 gap-4 overflow-x-auto">
                            {travellers?.map( traveller => (
                                <Link key={traveller.id} href={`/profile/${traveller.id}`}>
                                <div className="border-1 border-gray-200 rounded-sm shadow-sm px-2 py-2 flex flex-col" >
                                    <div className="flex items-center text-sm">
                                        <span className="mx-2">
                                            { traveller.img_path !== '' ? 
                                                <img className="w-12 h-12 object-cover rounded-full" alt="avatar" src={traveller.img_path}/> :
                                                <User strokeWidth={1} className="w-6 h-6" />}
                                        </span>
                                        <span className="text-md">{traveller.first_name} {traveller.last_name}</span>
                                        <span className="ml-auto">Joined on</span>
                                    </div>
                                </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </> : 
            " "}
            <div className={`${profilesShown === true ? "opacity-[5%]": " "} flex flex-col`}>
                <div className={`relative flex w-full justify-center mt-2 mb-5`}>
                    <Link href="/"> <span className="absolute left-0"><MoveLeft/> </span></Link>
                    <span className="font-semibold md:hidden">Trip</span>
                </div> 
                <div className="flex flex-col gap-2 mt-8">
                    <div className="flex justify-between">
                        <span className="text-3xl font-medium">{trip?.name}</span>
                        <button onClick={() => setShown(!shown)}>
                            <EllipsisVertical />
                        </button>
                        {shown === true ? 
                        <>
                        <div ref={wrapperRef} className={`bg-white absolute -right-3.5 mt-9 border-1 rounded-sm w-35  z-999 flex flex-col`}>
                            <span className="absolute right-5 -top-1.5 w-[11px] h-[11px] rotate-45 bg-white border-t border-l z-10"></span>
                            <div className="w-full h-1/2 p-1 text-sm">
                                <button onClick={handleLeave}><span className="flex items-center font-semibold"> <SquareArrowRightExit strokeWidth={1} height={15}/>Leave trip</span></button>
                            </div>
                            <div className="w-full h-1/2 p-1 text-sm">
                                <button> <span className="flex items-center font-semibold"><Trash strokeWidth={1} height={15}/>Delete</span></button>
                            </div>
                        </div>
                        </>: ""}
                    </div>
                    <button className="flex items-center border-1 rounded-lg p-[3px] w-12 text-sm text-gray-500" onClick={() => setProfilesShown(!profilesShown)}>
                       <User height={15}/>  <span>  {numberOfTravellers} </span>
                    </button>
                </div>
                <div className="mt-5 mb-1">
                    <span className="text-xl font-medium">History</span>
                </div>
                <div className="flex flex-col gap-2 ">
                    {numberOfExpenses > 0 ? 
                    <>
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
                    </> : 
                    <>
                        <div className="">
                            <span className="text-gray-500">No records available..</span>
                        </div>
                    </>}
                </div>
                <div className="flex justify-between mt-7 mb-1">
                    <span className="text-xl font-medium">Travellers</span>
                    <button className="active:scale-95 flex items-center border-1 border-gray-400 shadow-sm px-1 rounded-sm text-md" onClick={handleInvite}><Share height={15}/> Invite</button>
                </div>
                <div className="mt-2 flex flex-col p-4 border-1 border-gray-200 rounded-sm shadow-sm gap-4">
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
        </div>
        
    )
}

