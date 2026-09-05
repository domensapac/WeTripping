import { getNotifications, getTrips } from "./trip/actions";
import HomePage from "@/components/HomePage";

export default async function Home(){

  const [trips, notifications] = await Promise.all([
    getTrips(),
    getNotifications()
  ])

  console.log(trips)

  return(
    <HomePage trips={trips} notifications={notifications}/>
  )
}