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
  const { data: { user } , error: userError } = await supabase.auth.getUser();

  if(userError)
    throw new Error(userError.message); 

  const { data : trip, error: tripError } = await supabase
    .from('trips')
    .insert({
      name : data.destination,
      start_date : data.startDate,
      end_date : data.endDate,
      created_by : user?.id
    })
    .select()
    .single();

  if(tripError)
    throw new Error(tripError.message);

  const { error: travellerError } = await supabase
    .from('trip_travellers')
    .insert({
      trip_id: trip.id,
      user_id: user?.id,
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

  return `http://localhost:3000/trips/join/${inviteCode}`
}

function generateInviteCode(): string {
  return randomBytes(4).toString('hex');
}

export async function getInviteData(code : string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('invites')
    .select('*')
    .eq('invite_code', code)
    .maybeSingle();

  if(error){
    console.log("error"); 
  }

  if(data){ //invite obstaja
    const { data: { user } } = await supabase.auth.getUser() 

    if(user?.id == data?.created_by){
      //redirect('/home') 
    }

    return data; 
  }
}

export async function getTripData(trip_id : string){
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('trips')
    .select('*')
    .eq('id', trip_id)
    .maybeSingle();

  if(error){
    console.log("error"); 
  }

  return data;
}

export async function getUserData(user_id : string){
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user_id)
    .maybeSingle();

  if(error){
    console.log("error"); 
  }

  return data;
}

export async function joinTrip(formData: FormData){
  const code = formData.get('trip_code') as string
  const id = formData.get('trip_id') as string

  const supabase = await createClient()
    
  const { data: { user } } = await supabase.auth.getUser() 
  const userId = user?.id

  const { data : travellerData, error : travellerError} = await supabase
    .from('trip_travellers')
    .insert({trip_id : id, user_id : userId, role : 'joined'})

  if(travellerError){
    console.log(travellerError)
  }

  const { data, error } = await supabase
    .from('invites')
    .update({valid : false})
    .eq('invite_code', code)

  if(error){
    console.log(error)
  }

  redirect('/')
}

export async function getTrips(){
  const supabase = await createClient(); 

  const { data: { user } } = await supabase.auth.getUser() 

  const { data, error } = await supabase
    .from('trips')
    .select(`
      *,
      created_by:profiles!trips_created_by_fkey (
        first_name,
        last_name
      ),
      trip_travellers!inner (
        user_id,
        trip_id
      )
    `)
    .eq('trip_travellers.user_id', user?.id);
  
  if(error){
    console.log(error)
  } 

  return data
}