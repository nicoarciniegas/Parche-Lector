// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// Importa tus vistas/páginas
import WelcomeView from '../views/WelcomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import HomeView from '../views/HomeView.vue'
import ProfileView from '../views/ProfileView.vue'

const routes = [
  { path: '/',            name: 'welcome',  component: WelcomeView },
  { path: '/login',       name: 'login',    component: LoginView },
  { path: '/register',    name: 'register', component: RegisterView },
  { path: '/home',        name: 'home',     component: HomeView },
  { path: '/profile',     name: 'profile',  component: ProfileView },
  // ruta comodín para 404 (opcional)
  { path: '/:pathMatch(.*)*', name: 'not-found', component: WelcomeView }
]

const router = createRouter({
  history: createWebHistory(),   // <-- URLs bonitas (sin #)
  routes
})

export default router