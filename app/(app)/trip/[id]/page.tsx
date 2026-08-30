import TripPage from "@/components/TripPage";
import { getTripData, getTripTravellers } from "../actions";

export default async function Trip({ 
    params 
    }: { 
        params: Promise<{ id: string }> 
    }) {

    const { id } = await params;
    const tripData = await getTripData(id);
    
    const tripTravellers = await getTripTravellers(id)

    console.log(tripData)
    console.log(tripTravellers)

    const travellers = tripTravellers?.map(t => t.profiles) ?? []

    return (
        <TripPage trip={tripData} travellers={travellers}/>
    );
}