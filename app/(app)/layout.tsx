import Navbar from "@/components/Navbar";
 
export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
     <div className="flex flex-col w-full h-dvh">
      <div className="w-full flex flex-1 min-h-0 overflow-y-auto">
        {children}
      </div>
      <Navbar/>
    </div>
  );

}