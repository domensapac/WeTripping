
import Navbar from "@/components/Navbar";
import { Home, Plus, User } from "lucide-react";
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
      <Navbar/>
    </div>
  );

}