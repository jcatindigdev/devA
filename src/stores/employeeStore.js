import { defineStore } from 'pinia'
import { supabase } from '@/utils/supabase'

export const useEmployeeStore = defineStore('employee', {
  state: () => ({
    employees: [],
    currentEmployee: null,
    requirements: []
  }),
  actions: {
    async fetchEmployees() {
      const { data, error } = await supabase.from('employees').select('*')
      if (error) throw error
      this.employees = data
    },
    async fetchEmployeeById(id) {
      const { data, error } = await supabase
        .from('employees')
        .select('*, employee_previous_jobs(*)')
        .eq('id', id)
        .single()
      if (error) throw error
      this.currentEmployee = data
    },
    async fetchRequirements(employeeId) {
      const { data, error } = await supabase
        .from('employee_requirements')
        .select('*, requirements(*)')
        .eq('employee_id', employeeId)
      if (error) throw error
      this.requirements = data
    }
  }
})