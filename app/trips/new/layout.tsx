'use client'

import ErrorToast from '@/components/ErrorToast'
import { useState } from "react";
import { ProgressBar } from "@/components/ProgressBar";
import NewTrip from "./page";
import Link from 'next/link';
import { House } from 'lucide-react';

export default function TripLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const [step, setStep] = useState<string>('destination'); 
    
    return(
        <div className="bg-[url('/test_bg.png')]">
          <ErrorToast/>
            <div className="flex flex-col justify-center items-center min-h-screen w-full">
              <div className="w-90">
                <ProgressBar step={step}/>
              </div>
              <div>
                <NewTrip step={step} setStep={setStep}/>
              </div>
            </div>
        </div>
    )
}