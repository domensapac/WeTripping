import { ListCollapse, Plus, User } from "lucide-react";
import Link from "next/link";



export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <div className="flex flex-col w-full h-screen">
      <div className="w-full flex flex-1 min-h-0 overflow-y-auto">
        {children}
      </div>
      <div className="w-full shrink-0 h-15 flex items-center justify-center border-1 border-gray-200 p-2">
        <div className="flex w-3/4 justify-between items-center">
          <Link href="/">
            <ListCollapse/>
          </Link>
          <Link href="/trips/new" className="relative -top-7 bg-black rounded-full shadow-md p-3">
            <Plus className="text-white" size={35}/>
          </Link>
          <Link href="/profile">
            <User/>
          </Link>
        </div>
      </div>
    </div>
  );

}