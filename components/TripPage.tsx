'use client'

import { MoveLeft, User, Euro, SquareArrowRightExit , Share, EllipsisVertical, Trash, X, Copy, ArrowRight } from "lucide-react"
import Link from "next/link"
import { calculateTripExpenses, createInvite, deleteTrip, leaveTrip } from "@/app/(app)/trip/actions"
import { RefObject, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"

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
    expenses: Expense[] | null,
    authUserId: string | null
}

export default function TripPage({trip, travellers, expenses, authUserId} : TripProps){

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

    function useOutsideAlerterInvite(ref:any) {
        useEffect(() => {
            function handleClickOutside(event:any) {
            if (ref.current && !ref.current.contains(event.target)) {
                setInviteShown(false)
                setInviteLink('')
            }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const [checkBox, setCheckBox] = useState<boolean>(false)
    const [inviteLink, setInviteLink] = useState<string>('')
    const [inviteShown, setInviteShown] = useState<boolean>(false)
    const [profilesShown, setProfilesShown] = useState<boolean>(false)
    const [shown, setShown] = useState<boolean>(false)
    const wrapperRef = useRef(null);
    const wrapperRefProfiles = useRef(null);
    const wrapperRefInvite = useRef(null);

    useOutsideAlerter(wrapperRef);
    useOutsideAlerterProfiles(wrapperRefProfiles);
    useOutsideAlerterInvite(wrapperRefInvite);

    const router = useRouter();

    function handleCopy() {
        navigator.clipboard.writeText(inviteLink);
    }

    async function handleInviteCreate(){
        if(!trip){
            return
        }
        
        const data = await createInvite(trip?.id, checkBox)
        
        if(data){
            setInviteLink(data)
        }
    }

    async function handleLeave(){
        if(!trip){
            return
        }

        const data = await leaveTrip(trip?.id)
        router.push("/");
    }

    async function handleDelete(){
        if(!trip){
            return
        }

        const data = await deleteTrip(trip?.id)
        router.push("/");
    }

    return(
        <div className={`flex flex-col w-full gap-2 m-8 relative`}>  
            {inviteShown === true ? 
            <>
                <div className="fixed inset-0 w-full flex justify-center z-50 items-center">
                    <div ref={wrapperRefInvite} className="p-8 border-1 border-gray-300 w-[90%] h-90 relative z-70 bg-white rounded-sm shadow-xs">
                        <div className="flex justify-between">
                            <span className="text-2xl font-medium">Invite friends</span>
                            <button onClick={() => setInviteShown(!inviteShown)}>
                                <X className=""/>
                            </button>
                        </div>
                        <div className="flex flex-col mt-3 gap-4">
                            <div className="my-2 flex flex-col">
                                <span className="text-lg ">Additional</span>
                                <div className="flex items-center gap-1">
                                    <input 
                                        type="checkbox" 
                                        name="tomato" 
                                        checked={checkBox}
                                        onChange={(e) => setCheckBox(e.target.checked)}
                                    />
                                    <label>Doesn't expire</label>
                                </div>
                                <div className="w-full flex items-center text-xs gap-2 mt-7">
                                    <span className="grow truncate border-1 rounded-md p-2 text-gray-600 text-sm">{inviteLink || "No link yet.."}</span>
                                    <button className={`${inviteLink === "" ? "bg-indigo-100" : "bg-[#0d3978]"} text-sm font-medium text-white hover:cursor-pointer px-3 py-2  rounded-full shadow-xs`} onClick={handleCopy}> <Copy className="h-full p-1 hover:cursor-pointer group-active:scale-85"/> </button>
                                </div>
                                <button className="mt-8 w-full text-sm font-medium text-white bg-[#0d3978] hover:cursor-pointer px-2 py-2  rounded-full shadow-xs w-30" onClick={handleInviteCreate}>Create invite</button>      
                            </div>
                        </div>
                    </div>
                </div>
            </> : 
            " "}
            {profilesShown === true ? 
            <>
                <div className="fixed inset-0 w-full flex justify-center z-50 items-center">
                    <div ref={wrapperRefProfiles} className="p-8 border-1 border-gray-300 w-[90%] h-90 relative z-70 bg-white rounded-sm shadow-xs">
                        <div className="flex justify-between">
                            <span className="text-xl font-medium">View profiles</span>
                            <button onClick={() => setProfilesShown(!profilesShown)}>
                                <X className=""/>
                            </button>
                        </div>
                        <div className="h-[90%] flex flex-col mt-3 gap-4 overflow-x-auto">
                            {travellers?.map( traveller => (
                                <Link key={traveller.id} href={`/profile/${traveller.id}`}>
                                <div className="bg-[#A16207]/5 border-1 border-gray-200 rounded-sm shadow-xs px-2 py-2 flex flex-col" >
                                    <div className="flex items-center text-sm">
                                        <span className="mx-2">
                                            {traveller.img_path !== '' ? 
                                                <img className="w-12 h-12 object-cover rounded-full" alt="avatar" src={traveller.img_path}/> :
                                                <User strokeWidth={1} className="w-6 h-6" />}
                                        </span>
                                        <span className="text-md">{traveller.first_name} {traveller.last_name}</span>
                                        <span className="ml-auto me-3"><ArrowRight/></span>
                                    </div>
                                </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </> : 
            " "}
            <div className={`${profilesShown || inviteShown === true ? " blur-xs": " "} flex flex-col`}>
                <div className={`relative flex w-full justify-center mt-2 mb-5`}>
                    <Link href="/"> <span className="absolute left-0"><MoveLeft/> </span></Link>
                    <span className="font-semibold md:hidden">Trip</span>
                </div> 
                <div className="flex flex-col mt-8">
                    <div className="flex justify-between">
                        <span className="text-3xl font-semibold">{trip?.name}</span>
                        <button onClick={() => setShown(!shown)}>
                            <EllipsisVertical/>
                        </button>
                        {shown === true ? 
                        <>
                        <div ref={wrapperRef} className={`bg-white absolute -right-3.5 mt-9 border-1 rounded-sm w-35  z-999 flex flex-col`}>
                            <span className="absolute right-5 -top-1.5 w-[11px] h-[11px] rotate-45 bg-white border-t border-l z-10 flex"></span>
                            <div className="flex flex-col">
                                <button onClick={handleLeave} className="m-0  w-full"><span className="p-1 flex items-center font-semibold"> <SquareArrowRightExit strokeWidth={1} height={15}/>Leave trip</span></button>
                                <button onClick={handleDelete} disabled={(trip?.created_by != authUserId)} className="m-0  disabled:font-normal w-full"> <span className="p-1 flex items-center font-semibold"><Trash strokeWidth={1} height={15}/>Delete</span></button>
                            </div>
                        </div>
                        </>: ""}
                    </div>
                    <div className="text-gray-600">
                        {trip?.start_date ? <>{format(trip?.start_date, "dd.MM")} - {format(trip?.end_date, "dd.MM")}</> : ""}
                    </div>
                    <button className="mt-2 font-medium text-white bg-[#0d3978] hover:cursor-pointer px-1 rounded-full shadow-xs flex items-center w-12" onClick={() => setProfilesShown(!profilesShown)}>
                       <User height={15}/> <span>  {numberOfTravellers} </span>
                    </button>
                </div>
                <div className="mt-10 mb-2">
                    <span className="text-xl font-semibold ">History</span>
                </div>
                <div className="flex flex-col gap-2 ">
                    {numberOfExpenses > 0 ? 
                    <>
                        {expenses?.map(expense => (
                            <div className="bg-[#c1e0ff]/40 flex items-center p-4 border-gray-200 rounded-lg shadow-xs gap-4" key={expense.id}>
                                <div>
                                    <Euro strokeWidth={1.5}/>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-medium">{expense.description}</span>
                                    <span className="text-gray-600 text-xs">Paid by {expense.paid_by.first_name} {expense.paid_by.last_name}</span>
                                </div>
                                <div className="ml-auto">
                                    <span className="font-semibold">{expense.amount}€</span>
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
                    <span className="text-xl font-semibold ">Travellers</span>
                    <button className="active:scale-95 flex items-center text-md font-medium text-white bg-[#0d3978] hover:cursor-pointer px-2 rounded-full shadow-md" onClick={() => setInviteShown(true)}><Share height={15}/> Invite</button>
                </div>
                <div className="bg-[#c1e0ff]/40 mt-2 flex flex-col p-4 rounded-lg shadow-xs gap-4">
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

