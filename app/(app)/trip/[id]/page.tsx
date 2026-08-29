import TripPage from "@/components/TripPage";
import { getTripData } from "../actions";

export default async function Trip({ 
    params 
    }: { 
        params: Promise<{ id: string }> 
    }) {

    const { id } = await params;
    const tripData = await getTripData(id);
    
    console.log(tripData)

    return (
        <TripPage trip={tripData} travellers={tripData.travellers}/>
    );
}