<script setup>
import { reactive, computed } from 'vue'
import { useEmployeeStore } from '@/stores/employees'
import { supabase } from '@/utils/supabase'

const store = useEmployeeStore()

const form = reactive({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  department: '',
  start_date: '',
  employee_type: 'first_time',
  previous_employer: '',
  previous_position: ''
})

const isExperienced = computed(() => form.employee_type === 'experienced')

async function handleSubmit() {
  try {
    const employee = await store.addEmployee({
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      phone: form.phone,
      department: form.department,
      start_date: form.start_date,
      employee_type: form.employee_type
    })

    if (isExperienced.value) {
      await supabase.from('employee_previous_jobs').insert({
        employee_id: employee.id,
        company_name: form.previous_employer,
        position: form.previous_position
      })
    }
  } catch (err) {
    console.error(err)
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="form.first_name" placeholder="First name" required />
    <input v-model="form.last_name" placeholder="Last name" required />
    <input v-model="form.email" type="email" placeholder="Email" required />
    <input v-model="form.phone" placeholder="Phone" />
    <input v-model="form.department" placeholder="Department" />
    <input v-model="form.start_date" type="date" />

    <div>
      <label><input type="radio" v-model="form.employee_type" value="first_time" /> First-time employee</label>
      <label><input type="radio" v-model="form.employee_type" value="experienced" /> Has previous employer</label>
    </div>

    <div v-if="isExperienced">
      <input v-model="form.previous_employer" placeholder="Previous employer" />
      <input v-model="form.previous_position" placeholder="Previous position" />
    </div>

    <button type="submit">Save employee</button>
  </form>
</template>