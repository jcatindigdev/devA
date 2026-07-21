<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '@/utils/supabase'
import RequirementChecklist from '@/components/employees/RequirementChecklist.vue'

const route = useRoute()
const employee = ref(null)

onMounted(async () => {
  const { data, error } = await supabase
    .from('employees')
    .select('*')
    .eq('id', route.params.id)
    .single()

  if (error) console.error(error)
  else employee.value = data
})
</script>

<template>
  <div v-if="employee">
    <h1>{{ employee.first_name }} {{ employee.last_name }}</h1>
    <p>{{ employee.department }} — {{ employee.employee_type === 'first_time' ? 'First-time employee' : 'Experienced' }}</p>

    <h2>Requirements checklist</h2>
    <RequirementChecklist :employee-id="employee.id" />
  </div>
  <p v-else>Loading...</p>
</template>