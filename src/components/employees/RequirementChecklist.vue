<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'

const props = defineProps({
  employeeId: { type: String, required: true }
})

const requirements = ref([])
const loading = ref(true)

async function loadRequirements() {
  loading.value = true
  const { data, error } = await supabase
    .from('employee_requirements')
    .select('id, status, requirements(name, description)')
    .eq('employee_id', props.employeeId)

  if (error) console.error(error)
  else requirements.value = data
  loading.value = false
}

onMounted(loadRequirements)
</script>

<template>
  <div>
    <p v-if="loading">Loading requirements...</p>

    <ul v-else>
      <li v-for="req in requirements" :key="req.id">
        {{ req.requirements.name }}
        —
        <strong>{{ req.status === 'passed' ? 'Passed' : req.status === 'submitted' ? 'Submitted' : 'Missing' }}</strong>
      </li>
    </ul>

    <p v-if="!loading && requirements.length === 0">No requirements assigned.</p>
  </div>
</template>