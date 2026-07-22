<script setup>
import NavbarComponent from './components/NavbarComponent.vue';
import { onMounted, ref } from 'vue'

import { supabase } from './utils/supabase.ts'

const employees = ref([])

async function getEmployees() {
  const { data } = await supabase.from('employees').select()
  instruments.value = data
}

onMounted(() => {
  getEmployees()
})
</script>

<template>

  <NavbarComponent />

 <!--  <ul>
    <li v-for="employee in employees" :key="employee.id">{{ employee.first_name }}</li>
  </ul> -->
</template>