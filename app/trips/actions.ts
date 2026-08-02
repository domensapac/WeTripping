'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { randomBytes } from 'node:crypto';

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
  
  return trip; 
}

export async function createInvite(tripId:  number){
  const supabase = await createClient()
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if(userError)
    throw new Error(userError.message);

  let inviteCode = generateInviteCode(); 

  const { data : invite, error: inviteError } = await supabase
    .from('invites')
    .insert({
      trip_id : tripId,
      created_by : userData.user.id,
      invite_code : inviteCode
    })
    .select()
    .single();

  if(inviteError){
    console.log(inviteError); 
  }

  return `http://localhost:3000/join/${inviteCode}`
}

function generateInviteCode(): string {
  return randomBytes(4).toString('hex');
}