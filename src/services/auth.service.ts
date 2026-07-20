import { supabase } from '@/lib/supabase/client'
import {
  checkRateLimit,
  mapAuthError,
  resetRateLimit,
  sanitizeEmail,
  sanitizeText,
} from '@/lib/security'
import type { LoginFormData, RegisterFormData } from '@/schemas/auth.schema'
import type { Profile } from '@/types/database.types'

const RATE_LIMIT_KEY_LOGIN = 'auth:login'
const RATE_LIMIT_KEY_REGISTER = 'auth:register'

export async function signInWithEmail(data: LoginFormData): Promise<void> {
  const rateCheck = checkRateLimit(RATE_LIMIT_KEY_LOGIN)
  if (!rateCheck.allowed) {
    throw new Error(
      `Muitas tentativas de login. Tente novamente em ${Math.ceil((rateCheck.retryAfterMs ?? 0) / 60_000)} minutos.`,
    )
  }

  const email = sanitizeEmail(data.email)

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password: data.password,
  })

  if (error) {
    throw new Error(mapAuthError(error))
  }

  resetRateLimit(RATE_LIMIT_KEY_LOGIN)
}

export async function signUpWithEmail(data: RegisterFormData): Promise<{ needsEmailConfirmation: boolean }> {
  const rateCheck = checkRateLimit(RATE_LIMIT_KEY_REGISTER)
  if (!rateCheck.allowed) {
    throw new Error(
      `Muitas tentativas de cadastro. Tente novamente em ${Math.ceil((rateCheck.retryAfterMs ?? 0) / 60_000)} minutos.`,
    )
  }

  const email = sanitizeEmail(data.email)
  const fullName = sanitizeText(data.fullName, 100)

  const { data: authData, error } = await supabase.auth.signUp({
    email,
    password: data.password,
    options: {
      data: {
        full_name: fullName,
      },
      emailRedirectTo: `${window.location.origin}/login`,
    },
  })

  if (error) {
    throw new Error(mapAuthError(error))
  }

  resetRateLimit(RATE_LIMIT_KEY_REGISTER)

  const needsEmailConfirmation = !authData.session

  return { needsEmailConfirmation }
}

export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut()
  if (error) {
    throw new Error(mapAuthError(error))
  }
}

export async function fetchProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .eq('is_active', true)
    .maybeSingle()

  if (error) {
    return null
  }

  return data
}
