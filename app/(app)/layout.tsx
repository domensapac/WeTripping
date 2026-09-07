import Navbar from "@/components/Navbar";
 
export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
     <div className="flex flex-col w-full h-dvh md:w-[70%] md:border-1 md:border-gray-200">
      <div className="w-full flex flex-1 min-h-0 overflow-y-auto md:order-1">
        {children}
      </div>
      <Navbar/>
    </div>
  );

}