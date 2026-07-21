{
  path: '/employees',
  name: 'employee-list',
  component: () => import('@/pages/employees/EmployeeList.vue'),
  meta: { requiresAuth: true, requiresRole: 'hr' }
},
{
  path: '/employees/new',
  name: 'employee-add',
  component: () => import('@/pages/employees/EmployeeAdd.vue'),
  meta: { requiresAuth: true, requiresRole: 'hr' }
},
{
  path: '/employees/:id',
  name: 'employee-detail',
  component: () => import('@/pages/employees/EmployeeDetail.vue'),
  meta: { requiresAuth: true, requiresRole: 'hr' },
  props: true
},
{
  path: '/my-requirements',
  name: 'my-requirements',
  component: () => import('@/pages/employees/MyRequirements.vue'),
  meta: { requiresAuth: true }
}