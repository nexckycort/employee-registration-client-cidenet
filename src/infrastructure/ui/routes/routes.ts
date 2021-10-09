import { lazy } from 'react'
import { Routes, routing } from 'infrastructure/lib/routing'

import Home from 'infrastructure/ui/pages/Home'
const Employee = lazy(async () => await import('infrastructure/ui/pages/Employee'))

const appRoutes: Routes[] = [
  {
    title: 'Home',
    path: '/',
    component: Home
  },
  {
    title: 'New Employee',
    path: '/employee',
    component: Employee
  },
  {
    title: 'Edit Employee',
    path: '/employee/:id',
    component: Employee
  }
]

const routes = routing(appRoutes)

export default routes
