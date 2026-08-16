import { ListCollapse, LogOut, Plus, User } from "lucide-react";
import Link from "next/link";
import { logout } from '../(auth)/actions';



export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <div className="flex flex-col w-full h-screen">
      <div className="absolute top-2 right-2">
        <form action={logout}>
          <button><LogOut/></button>
        </form>
      </div>
      <div className="w-full flex flex-1 min-h-0 overflow-y-auto">
        {children}
      </div>
      <div className="w-full shrink-0 flex items-center justify-center border-1 border-black p-2">
        <div className="flex w-3/4 justify-between items-center">
          <Link href="/">
            <ListCollapse/>
          </Link>
          <Link href="/trips/new">
            <Plus size={45}/>
          </Link>
          <Link href="/profile">
            <User/>
          </Link>
        </div>
      </div>
    </div>
  );

}