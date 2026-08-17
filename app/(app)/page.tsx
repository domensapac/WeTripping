import { getNotifications, getTrips } from "./trip/actions";
import HomePage from "@/components/HomePage";

export default async function Home(){

  const trips = await getTrips()
  const notifications = await getNotifications()
  console.log(trips)

  
  return(
    <HomePage trips={trips} notifications={notifications}/>
  )
}