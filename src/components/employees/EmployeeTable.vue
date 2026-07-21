<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useEmployeeStore } from '@/stores/employees'

const store = useEmployeeStore()
const router = useRouter()

onMounted(() => {
  store.fetchAll()
})

function goToDetail(id) {
  router.push({ name: 'employee-detail', params: { id } })
}
</script>

<template>
  <div>
    <p v-if="store.loading">Loading employees...</p>

    <table v-else>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Department</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="emp in store.employees"
          :key="emp.id"
          @click="goToDetail(emp.id)"
          style="cursor: pointer;"
        >
          <td>{{ emp.first_name }} {{ emp.last_name }}</td>
          <td>{{ emp.employee_type === 'first_time' ? 'First-time' : 'Experienced' }}</td>
          <td>{{ emp.department }}</td>
          <td>›</td>
        </tr>
      </tbody>
    </table>

    <p v-if="!store.loading && store.employees.length === 0">No employees yet.</p>
  </div>
</template>