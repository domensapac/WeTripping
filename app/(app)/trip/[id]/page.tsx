import TripPage from "@/components/TripPage";
import { getTripData, getTripExpenses, getTripTravellers } from "../actions";

export default async function Trip({ 
    params 
    }: { 
        params: Promise<{ id: string }> 
    }) {

    const { id } = await params;

    const [tripData, tripTravellers, tripExpenses] = await Promise.all([
        getTripData(id),
        getTripTravellers(id),
        getTripExpenses(id)
    ])
    
    const travellers = tripTravellers?.map(t => t.profiles) ?? []

    return (
        <TripPage trip={tripData} travellers={travellers} expenses={tripExpenses}/>
    );
}