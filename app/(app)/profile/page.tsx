import { logout } from "@/app/(auth)/actions"
import { LogOut } from "lucide-react";

export default function Profile() {
    return( 
        <div className="w-full flex m-8">
            <div className="w-full flex justify-center font-semibold">Profile</div>
            <div className="absolute top-2 right-2">
                <form action={logout}>
                <button><LogOut/></button>
                </form>
            </div>
        </div>
    )
}