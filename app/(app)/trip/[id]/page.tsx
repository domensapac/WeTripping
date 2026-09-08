import TripPage from "@/components/TripPage";
import { getTripData, getTripExpenses, getTripTravellers } from "../actions";
import { getAuthenticatedUser } from "@/app/(auth)/actions";

export default async function Trip({ 
    params 
    }: { 
        params: Promise<{ id: string }> 
    }) {

    const { id } = await params;

    const [tripData, tripTravellers, tripExpenses, authUser] = await Promise.all([
        getTripData(id),
        getTripTravellers(id),
        getTripExpenses(id),
        getAuthenticatedUser()
    ])
    
    const travellers = tripTravellers?.map(t => t.profiles) ?? []

    return (
        <TripPage trip={tripData} travellers={travellers} expenses={tripExpenses} authUserId={authUser?.id || ''}/>
    );
}