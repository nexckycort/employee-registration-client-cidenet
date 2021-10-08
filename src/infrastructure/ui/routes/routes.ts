import { Routes, routing } from 'infrastructure/lib/routing'
import Home from 'infrastructure/ui/pages/Home'

const appRoutes: Routes[] = [
  {
    title: 'Home',
    path: '/',
    component: Home
  }
]

const routes = routing(appRoutes)

export default routes
