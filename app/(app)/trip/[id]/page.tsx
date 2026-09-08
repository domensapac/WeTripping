import TripPage from "@/components/TripPage";
import { calculateTripExpenses, getTripData, getTripExpenses, getTripTravellers } from "../actions";
import { getAuthenticatedUser } from "@/app/(auth)/actions";

export default async function Trip({ 
    params 
    }: { 
        params: Promise<{ id: string }> 
    }) {

    const { id } = await params;

    const [tripData, tripTravellers, tripExpenses, authUser, results] = await Promise.all([
        getTripData(id),
        getTripTravellers(id),
        getTripExpenses(id),
        getAuthenticatedUser(),
        calculateTripExpenses(id)
    ])
    
    console.log(results)
    
    const travellers = tripTravellers?.map(t => t.profiles) ?? []

    return (
        <TripPage trip={tripData} travellers={travellers} expenses={tripExpenses} authUserId={authUser?.id || ''}/>
    );
}