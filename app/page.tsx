import Link from "next/link";
import { logout } from "./(auth)/actions";

export default function Home(){
  return(
    <div className="flex gap-3">
      <Link href="/">Home</Link>
      <Link href="/trips/new">New trip</Link>
      <button onClick={logout}>Logout</button>
    </div>
  )
}