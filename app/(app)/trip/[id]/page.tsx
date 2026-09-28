import TripPage from "@/components/TripPage";
import { getTripData, getTripExpenses, getTripTravellers } from "../actions";
import { getAuthenticatedUser } from "@/app/(auth)/actions";

type User = {
    created_at:string,
    img_path:string,
    profiles: {
        created_at: string,
        first_name: string,
        id: string,
        img_path: string,
        last_name: string
    }
    role: string,
    total_amount: number,
    trip_id: string,
    user_id: string
}

interface Expense {
  id: number;
  amount: number;
  description: string;
  category: string | null;
  added_by: string;
  paid_by: User;
  created_at: string;
  trip_id: number;
}

interface UserTotal {
  user: User;
  total_amount: number;
}

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
        getAuthenticatedUser(),
    ])
    

    
    //const travellers = tripTravellers?.map(t => t.profiles) ?? []

    console.log("FORMAT ODDAN: ", tripTravellers)

    return (
        <TripPage trip={tripData} travellers={tripTravellers} expenses={tripExpenses} authUserId={authUser?.id || ''}/>
    );
}