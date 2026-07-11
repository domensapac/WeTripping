import Image from "next/image";
import { logout } from "@/app/(auth)/actions";

export default function LogoutButton() {
  return (
    <div className="fixed right-5 top-5">
        <form action={logout}>
            <button className="text-gray-600 border-1">
                Logout
            </button>
        </form>
    </div>
  );
}
