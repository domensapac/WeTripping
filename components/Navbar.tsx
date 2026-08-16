'use client'

import { Home, Plus, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from 'next/navigation'

export default function Navbar(){
    const pathname = usePathname()
    console.log(pathname)
        

    return(
        <div className="w-full shrink-0 h-15 flex items-center justify-center border-1 border-gray-200 p-2">
            <div className="flex w-3/4 justify-between items-center">
            <Link href="/" className="flex flex-col items-center">
                <Home/>
                <span className={pathname === '/' ? "absolute bottom-2 h-[4px] w-[4px] rounded-full bg-black" : "hidden"} ></span>
            </Link>
            <Link href="/trips/new" className="relative -top-7 bg-black rounded-full shadow-xl p-3">
                <Plus className="text-white" size={35}/>
            </Link>
            <Link href="/profile" className="flex flex-col items-center">
                <User/>
                <span className={pathname === '/profile' ? "absolute bottom-2 h-[4px] w-[4px] rounded-full bg-black" : "hidden"} ></span>
            </Link>
            </div>
        </div>
    )
}