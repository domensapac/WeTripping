'use client'

import { usePathname } from "next/navigation"

export default function TripPage(){
    const pathname = usePathname()
    return(
        <div>
            {pathname}
        </div>
    )
}