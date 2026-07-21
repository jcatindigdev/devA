<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'
import RequirementChecklist from '@/components/employees/RequirementChecklist.vue'

const employee = ref(null)

onMounted(async () => {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return

  const { data, error } = await supabase
    .from('employees')
    .select('*')
    .eq('user_id', session.user.id)
    .single()

  if (error) console.error(error)
  else employee.value = data
})
</script>

<template>
  <div v-if="employee">
    <h1>My requirements</h1>
    <RequirementChecklist :employee-id="employee.id" />
  </div>
  <p v-else>Loading...</p>
</template>