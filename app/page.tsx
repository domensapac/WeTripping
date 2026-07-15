'use client';

import Image from "next/image";
import { createTrip, logout } from "./(auth)/actions";
import { MapPinned } from 'lucide-react';
import { useState } from "react";
import { MoveLeft } from 'lucide-react';
import * as React from "react"
import { addDays } from "date-fns"
import { type DateRange } from "react-day-picker"
import { DatePickerWithRange } from "@/components/DatePicker";
import { InputGroupIcon } from "@/components/LocationInput";

type TripData = {
  destination : string; 
  startDate : string; 
  endDate : string; 
}; 


export default function Home() {


  async function handleSubmit() {
    const tripData = {
      destination,
      startDate: date?.from?.toISOString() ?? '',
      endDate: date?.to?.toISOString() ?? '',
    }
     
    try{
      const trip = await createTrip(tripData);
    }catch(err){
      console.error('Napaka', err);
    }
  }


  const [destination, setDestination] = useState<string>(''); 
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 20),
    to: addDays(new Date(new Date().getFullYear(), 0, 20), 20),
  })

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
          <span className="text-2xl">Where to?</span>
        </div>
        <div className=" my-3">
            <InputGroupIcon destination={destination} setDestination={setDestination}/>
        </div>
        <div className="mt-5">
          <button className="border-1 rounded-sm p-1 hover:cursor-pointer" onClick={() => setStep('dates')}>Continue</button>
        </div>
      </div>
    </div>
    );
  }

  return (
    <div className="tracking-[1px] min-h-screen flex bg-gray-400 w-full justify-center items-center text-gray-400">
      <div className="relative flex-1 m-6 h-72 flex flex-col border-1 rounded-sm justify-center items-center bg-white">
        <span className="absolute top-4 left-4" onClick={() => {setStep('destination')}}><MoveLeft /></span>
        <div className="my-3">
          <span className="text-2xl flex ">Dates?</span>
        </div>
        <div className="my-3">
          <DatePickerWithRange date={date} setDate={setDate}/>
        </div>
        <div className="mt-5">
          <button className="border-1 rounded-sm p-1 hover:cursor-pointer w-18" onClick={handleSubmit}>Done</button>
        </div>
      </div>
    </div>
  );
  
}
