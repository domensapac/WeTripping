'use client'

type Trip = {
    id: number,
    created_at: Date,
    name: string,
    start_date: Date,
    end_date: Date,
    created_by: string
}

type User = {
    id: string,
    first_name: string,
    last_name: string,
    created_at: Date,
    img_path: string
}

type TripProps = {
    trip: Trip | null,
    travellers: User[] | null
}

export default function TripPage( {trip, travellers} : TripProps){

    return(
        <div className={`flex flex-col w-full gap-3 m-8 relative`}>  
            <div className="relative flex w-full justify-center items-center mt-2 mb-5">
                <span className="font-semibold">Trip</span>
            </div> 
            <span className="text-xl">{trip?.name}</span> 
        </div>
    )
}