'use client'

import { Home, Plus, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from 'next/navigation'

export default function Navbar(){
    const pathname = usePathname()

    const isTripPage = pathname?.startsWith('/trip/') && pathname !== '/trip/new'
    const tripId = isTripPage ? pathname.split('/')[2] : null

    const fabHref = tripId ? `/trip/${tripId}/expense/new` : '/trip/new'

    return(
        <div className="w-full shrink-0 h-15 flex items-center justify-center border-1 border-gray-200 p-2 z-999 md:order-0">
            <div className="flex w-3/4 justify-between items-center">
            <Link href="/" >
            <div className="flex flex-col items-center relative h-full">
                <Home className="md:hidden"/>
                <span className={pathname === '/' ? "md:hidden absolute -bottom-2 h-[4px] w-[4px] rounded-full bg-black" : "hidden"} ></span>
                <span className={pathname === '/' ? "md:flex hidden text-lg font-semibold" : "md:flex hidden"} >Home</span>
            </div>
                
            </Link>
            <Link href={fabHref} className="md:hidden relative -top-7 bg-[#1B6BFF] rounded-full shadow-xl p-3">
                <Plus className="md:hidden text-white" size={35}/>
            </Link>
            <Link href={fabHref} className="hidden md:flex flex-col items-center">
                <span className={pathname === '/trip/new' ? "md:flex hidden text-lg font-semibold" : "md:flex hidden"} >New trip</span>
            </Link>
            <Link href="/profile" >
                <div className="flex flex-col items-center relative h-full">
                    <User className="md:hidden"/>
                    <span className={pathname === '/profile' ? "md:hidden absolute -bottom-2  h-[4px] w-[4px] rounded-full bg-black" : "hidden"} ></span>
                    <span className={pathname === '/profile' ? "md:flex hidden text-lg font-semibold" : "md:flex hidden"} >Profile</span>
                </div>
            </Link>
            </div>
        </div>
    )
}