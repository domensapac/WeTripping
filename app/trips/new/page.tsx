'use client';

import { createTrip, logout } from "@/app/(auth)/actions";
import { useState } from "react";
import * as React from "react"
import { addDays } from "date-fns"
import { type DateRange } from "react-day-picker"
import DestinationStep from "./_components/DestinationStep";
import DatesStep from "./_components/DatesStep";
import SuccessPage from "./SuccessPage";

export default function NewTrip() {

  async function handleSubmit() {

    if(!destination || !date?.from || !date?.to){
      return;
    }

    const tripData = {
      destination,
      startDate: date?.from?.toISOString() ?? '',
      endDate: date?.to?.toISOString() ?? '',
    }
     
    try{
      const trip = await createTrip(tripData);
      setStep('success'); 

    }catch(err){
      console.error('Napaka', err);
    }

  }

  const [destination, setDestination] = useState<string>(''); 
  const [step, setStep] = useState<string>('destination'); 
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 20),
    to: addDays(new Date(new Date().getFullYear(), 0, 20), 20),
  })
  
  if(step === 'destination'){
    return (
        <DestinationStep destination={destination} setDestination={setDestination} setStep={setStep}/>
    );
  }

  if(step == 'dates'){
    return (
      <DatesStep date={date} setDate={setDate} setStep={setStep } handleSubmit={handleSubmit}/>
    );
  }  

  if(step == 'success'){
    return(
      <SuccessPage destination={destination} dates={date}/>
    )
  }
}
