<script setup>
import EmployeeTable from '@/components/employees/EmployeeTable.vue'
</script>

<template>
  <div>
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <h1>Employees</h1>
      <router-link :to="{ name: 'employee-add' }">
        <button>Add employee</button>
      </router-link>
    </div>
    <EmployeeTable />
  </div>
</template>