
<template>
  <div class="auth-container">
    <div class="auth-card">
      <h1 class="auth-title">Crear cuenta</h1>
      <p class="auth-subtitle">Únete a la comunidad lectora</p>

      <form @submit.prevent="handleRegister" class="auth-form">
        <div class="input-group">
          <label>Nombre completo</label>
          <input v-model="name" type="text" required placeholder="Ana García" />
        </div>

        <div class="input-group">
          <label>Email</label>
          <input v-model="email" type="email" required placeholder="ana@email.com" />
        </div>

        <div class="input-group">
          <label>Contraseña</label>
          <input v-model="password" type="password" required placeholder="Mínimo 6 caracteres" />
        </div>

        <button type="submit" class="btn-primary full-width">
          Crear cuenta
        </button>
      </form>

      <p class="auth-footer">
        ¿Ya tienes cuenta? 
        <router-link to="/login" class="link-highlight">Iniciar sesión</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')

const handleRegister = () => {
  // Aquí iría tu lógica de registro
  console.log('Registro:', { name: name.value, email: email.value })
  router.push('/home')
}
</script>

<style scoped>
/* Mismo estilo que LoginView – reutiliza todo */
.auth-container { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 1rem; }
.auth-card { background: #FDFBF7; padding: 3rem 2.5rem; border-radius: 20px; box-shadow: 0 12px 40px rgba(139, 111, 71, 0.15); width: 100%; max-width: 420px; }
.auth-title { font-size: 2.2rem; text-align: center; margin-bottom: 0.5rem; }
.auth-subtitle { text-align: center; margin-bottom: 2.5rem; color: #6B9080; }
.auth-form { display: flex; flex-direction: column; gap: 1.25rem; }
.input-group label { display: block; margin-bottom: 0.5rem; font-weight: 600; color: #2E5266; }
.input-group input { width: 100%; padding: 1rem; border: 2px solid #E8E2D9; border-radius: 12px; font-size: 1rem; }
.input-group input:focus { outline: none; border-color: #F9C846; }
.full-width { width: 100%; margin-top: 1rem; }
.auth-footer { text-align: center; margin-top: 2rem; font-size: 0.95rem; }
.link-highlight { color: #F9C846; font-weight: 600; text-decoration: none; }
.link-highlight:hover { text-decoration: underline; }
</style>