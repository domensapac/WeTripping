'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if(password !== confirmPassword){
    redirect(`/signup?error=${encodeURIComponent('Passwords must match')}`)
  }

  const { error } = await supabase.auth.signUp({ email, password }); 

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

export async function resetPassword(formData: FormData){
  const supabase = await createClient()

  const email = formData.get('email') as string

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'http://localhost:3000/confirm?next=/new-password',
  })

  if(error){
    redirect(`/reset-password?error=${encodeURIComponent(error.message)}`)
  }

  redirect(`/reset-password?error=${encodeURIComponent('Reset link sent to your email')}`)
}

export async function updatePassword(formData: FormData){
  const supabase = await createClient()

  const newPassword = formData.get('password') as string
  const repeatPassword = formData.get('repeatPassword') as string 

  if(newPassword !== repeatPassword){
    redirect(`/new-password?error=${encodeURIComponent('Passwords must match')}`)
  }

  const { error } = await supabase.auth.updateUser({
    password: newPassword
  })

  if(error){
    redirect(`/new-password?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/', 'layout')
  redirect('/signin')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/signin')
}


