import { Architects_Daughter } from "next/font/google";
import { Children } from "react";

const architectsDaughter = Architects_Daughter({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-architects',
});

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <div className="tracking-[1px] flex min-h-screen w-full text-gray-400">
            <div className="hidden md:flex md:w-1/3 lg:w-1/2 bg-cover bg-gray-500 ...">    
            </div>
            <div className="bg-cover bg-gray-500 md:bg-white w-full md:w-2/3 lg:w-1/2 flex justify-center items-center">
                <div className="bg-white md:bg-none w-full flex-1 m-6 md:m-12 border-1 border-white rounded-lg flex-col">
                    <span className={`flex text-xl w-full justify-center text-gray-400 ${architectsDaughter.className}`}> Welcome back! </span>
                    {children}
                </div>
            </div>
        </div>
    ); 
}
