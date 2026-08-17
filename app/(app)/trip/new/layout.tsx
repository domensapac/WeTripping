'use client'

import ErrorToast from '@/components/ErrorToast'
import { useState } from "react";
import { ProgressBar } from "@/components/ProgressBar";
import NewTrip from "./page";



export default function TripLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const [step, setStep] = useState<string>('destination'); 
    
    return(
      <div className="w-full">
        <ErrorToast/>
          <div className="h-full flex flex-col justify-center items-center w-full">
            <div className="w-90 ">
              <ProgressBar step={step}/>
            </div>
            <div>
              <NewTrip step={step} setStep={setStep}/>
            </div>
          </div>
      </div>
    )
}