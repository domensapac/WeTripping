import { getTrips } from "./trip/actions";
import HomePage from "@/components/HomePage";

export default async function Home(){

  const trips = await getTrips()
  console.log(trips)

  
  return(
    <HomePage trips={trips}/>
  )
}