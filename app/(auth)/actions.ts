'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const data = await supabase.auth.signUp({ email, password }); 
  const error = data.error; 

  if (error) {
    redirect(`/signup?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/signin', 'layout')
  redirect('/signin')
}

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    redirect(`/signin?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/trips/new', 'layout')
  redirect('/trips/new')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/signin')
}

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
  
  redirect('/');
}

