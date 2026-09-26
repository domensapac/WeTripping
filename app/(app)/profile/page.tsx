import { getUserData, logout } from "@/app/(auth)/actions"
import { getTrips } from "../trip/actions";
import ProfilePage from "@/components/ProfilePage";

export default async function Profile() {
    
    const [data, trips] = await Promise.all([
        getUserData(),
        getTrips()
    ])
    
    return( 
        <ProfilePage data={data} length={trips?.length ?? 0}/>
    )
}