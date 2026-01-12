
import RegistroView from '@/views/RegistroView.vue'
import DashboardView from '@/views/DashboardView.vue'
import LoginView from '@/views/LoginView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { estaAutenticado } from '@/servicios/autenticacion'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: RegistroView},
    { path: '/login', component: LoginView },
    { path: '/perfil', component: DashboardView, meta: { requiresAuth: true } },

  ],
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (estaAutenticado()) {
      next() // permitimos el acceso
    } else {
      next('/login') // redirigimos al login
    }
  } else {
    next() // permitimos el acceso a rutas públicas
  }
})


export default router
