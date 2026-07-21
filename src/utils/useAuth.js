// src/composables/useAuth.js
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'

const user = ref(null)
const role = ref(null)

async function loadProfile() {
  const { data: { session } } = await supabase.auth.getSession()
  user.value = session?.user ?? null

  if (user.value) {
    const { data } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.value.id)
      .single()
    role.value = data?.role ?? 'employee'
  } else {
    role.value = null
  }
}

supabase.auth.onAuthStateChange(() => {
  loadProfile()
})

async function signIn(email, password) {
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
}

async function signUp(email, password) {
  const { error } = await supabase.auth.signUp({ email, password })
  if (error) throw error
}

async function signOut() {
  await supabase.auth.signOut()
}

loadProfile()

export function useAuth() {
  return { user, role, signIn, signUp, signOut }
}