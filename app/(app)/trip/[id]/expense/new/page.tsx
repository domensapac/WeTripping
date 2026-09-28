'use server'

import NewExpensePage from "@/components/NewExpensePage";
import { getTripData, getTripTravellers } from "../../../actions";

export default async function NewExpense({ 
    params 
    }: { 
        params: Promise<{ id: string }> 
    }) {

    const { id } = await params;
    
    const tripData = await getTripData(id);
    
    const tripTravellers = await getTripTravellers(id)

    //const travellers = tripTravellers?.map(t => t.profiles) ?? []

    console.log("TRAVELLERS FORMAT:", tripTravellers)
    
    return(
        <NewExpensePage trip={tripData} travellers={tripTravellers}/>
    )
}