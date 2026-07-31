'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

type TripData = {
  destination : string; 
  startDate : string; 
  endDate : string; 
}; 

export async function createTrip(data : TripData) {
  const supabase = await createClient()
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if(userError)
    throw new Error(userError.message); 

  const { data : trip, error: tripError } = await supabase
    .from('trips')
    .insert({
      name : data.destination,
      start_date : data.startDate,
      end_date : data.endDate
    })
    .select()
    .single();

  if(tripError)
    throw new Error(tripError.message);

  const { error: travellerError } = await supabase
    .from('trip_travellers')
    .insert({
      trip_id: trip.id,
      user_id: userData.user.id,
      role: 'organizer',
    });

  if (travellerError) 
    throw new Error(travellerError.message);
  
  //redirect('/');

  return trip; 
}