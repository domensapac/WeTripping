'use client';

import { createInvite, createTrip } from "../actions";
import { useState } from "react";
import * as React from "react"
import { addDays } from "date-fns"
import { type DateRange } from "react-day-picker"
import DestinationStep from "./_components/DestinationStep";
import DatesStep from "./_components/DatesStep";
import SuccessPage from "./_components/SuccessPage";
import ConfirmationStep from "./_components/Confirmation";

type PropType = {
  step : string
  setStep : React.Dispatch<React.SetStateAction<string>>
}

export default function NewTrip({step, setStep} : PropType) {

  async function handleSubmit() {
    console.log("HALO");
    
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

      const inviteLink = await createInvite(trip.id); 


      setInvite(inviteLink); 
      setStep('success'); 

    }catch(err){
      console.log(err);
    }
  }

  const [invite, setInvite] = useState<string>('')
  const [destination, setDestination] = useState<string>(''); 
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date,
    to: addDays(new Date(), 20),
  })
  
  if(step === 'destination'){
    return (
        <DestinationStep destination={destination} setDestination={setDestination} setStep={setStep}/>
    );
  }

  if(step === 'dates'){
    return (
      <DatesStep date={date} setDate={setDate} setStep={setStep }/>
    );
  }  

  if(step === 'confirmation'){
    return (
      <ConfirmationStep destination={destination} date={date} setStep={setStep} handleSubmit={handleSubmit}/>
    );
  }

  if(step === 'success'){
    return(
      <SuccessPage destination={destination} dates={date} inviteLink={invite}/>
    )
  }
}
