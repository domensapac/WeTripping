'use client';

import Image from "next/image";
import { createTrip, logout } from "./(auth)/actions";
import { MapPinned } from 'lucide-react';
import { useState } from "react";
import { MoveLeft } from 'lucide-react';

type TripData = {
  destination : string; 
  startDate : string; 
  endDate : string; 
}; 

export default function Home() {

  const [step, setStep] = useState<string>('destination'); 
  const [formData, setFormData] = useState<TripData>({
    destination : '',
    startDate : '', 
    endDate : '',
  })

  if(step === 'destination'){
    return (
    <div className="tracking-[1px] min-h-screen flex bg-gray-400 w-full justify-center items-center text-gray-400">
      <div className="flex-1 m-6 h-72 flex flex-col border-1 rounded-sm justify-center items-center bg-white">
        <div className="my-3">
          <span className="text-2xl flex "><MapPinned /> Where to?</span>
        </div>
        <div className="my-3">
          <input className="border-1 rounded-sm p-0.5" type="text" />
        </div>
        <div>
          <button className="border-1 rounded-sm p-1 hover:cursor-pointer" onClick={() => setStep('dates')}>Continue</button>
        </div>
      </div>
    </div>
    );
  }

  return (
    <div className="tracking-[1px] min-h-screen flex bg-gray-400 w-full justify-center items-center">
      <div className="flex-1 m-6 h-72 flex flex-col border-1 rounded-sm justify-center items-center">
        <span onClick={() => {setStep('destination')}}><MoveLeft /></span>
        <div className="my-3">
          <span className="text-2xl flex ">Dates?</span>
        </div>
        <div className="my-3">
          <input className="border-1 rounded-sm p-0.5" type="text" />
        </div>
        <div>
          <button className="border-1 rounded-sm p-1 hover:cursor-pointer" onClick={() => {createTrip(formData)}}>Done</button>
        </div>
      </div>
    </div>
  );
  
}
