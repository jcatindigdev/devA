import { defineStore } from 'pinia'
import { supabase } from '@/utils/supabase'

export const useEmployeeStore = defineStore('employees', {
  state: () => ({
    employees: [],
    loading: false
  }),
  actions: {
    async fetchAll() {
      this.loading = true
      const { data, error } = await supabase.from('employees').select('*')
      if (error) console.error(error)
      else this.employees = data
      this.loading = false
    },
    async addEmployee(payload) {
      const { data, error } = await supabase
        .from('employees')
        .insert(payload)
        .select()
        .single()
      if (error) throw error
      this.employees.push(data)
      return data
    }
  }
})