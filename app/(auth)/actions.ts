'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'


export type SignInState = {
  error: string | null
}

export type SignUpState = {
  error: string | null
}

export type ResetPasswordState = {
  error: string | null, 
  success? : boolean
}

export type NewPasswordState = {
  error: string | null
}

export async function signup(prevState: SignUpState, formData: FormData): Promise<SignUpState> {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string
  const first_name = formData.get('first_name') as string
  const last_name = formData.get('last_name') as string

  if(password !== confirmPassword){
    return { error: "Passwords must match!"}
  }

  const { data, error } = await supabase.auth.signUp({ 
    email: email, 
    password: password,
    options: {
      data: {
        first_name : first_name,
        last_name : last_name
      }
    } }); 

  if (error) {
    return { error: error.message } 
  }

  const { data : notifData, error: notifError } = await supabase
    .from('notifications')
    .insert({
      user_id: data.user?.id,
      title: "Thank you for joining us!",
      description: "Create your first trip and share it with friends",
      type: "welcome_message"
    })
    .select()
    .maybeSingle()

    
  revalidatePath('/signin', 'layout')
  redirect('/signin')
}

export async function login(prevState: SignInState, formData: FormData): Promise<SignUpState> {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { error: error.message } 
  }

  revalidatePath('/', 'layout')
  redirect('/')  
}

export async function resetPassword(prevState: ResetPasswordState, formData: FormData): Promise<ResetPasswordState> {
  const supabase = await createClient()

  const email = formData.get('email') as string

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'http://localhost:3000/confirm?next=/new-password',
  })

  if(error){
    return { error: error.message}
  }

  return { error: null, success : true}
}

export async function updatePassword(prevState: NewPasswordState, formData: FormData): Promise<NewPasswordState> {
  const supabase = await createClient()

  const newPassword = formData.get('password') as string
  const repeatPassword = formData.get('repeatPassword') as string 

  if(newPassword !== repeatPassword){
    return { error: "Passwords must match"}
  }

  const { error } = await supabase.auth.updateUser({
    password: newPassword
  })

  if(error){
    return { error: error.message}
  }

  redirect('/signin')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/signin')
}


