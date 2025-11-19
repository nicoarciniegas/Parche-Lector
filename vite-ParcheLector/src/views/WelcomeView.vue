<script setup>
import { useRouter } from 'vue-router'

// Cambia estos nombres según tus rutas reales
const router = useRouter()
const goToLogin = () => router.push('/login')
const goToRegister = () => router.push('/register')
</script>

<template>
  <div class="welcome-container">
    <!-- Ilustración / Icono -->
    <img
      src="../../public/icon.svg"
      alt="El Parche Lector"
      class="welcome-icon"
    />

    <!-- Títulos y descripción -->
    <h1 class="title">
      ¡Bienvenido/a <br />a<br />El Parche Lector!
    </h1>

    <p class="description">
      Descubre historias que unen a las personas.<br />
      Lee, comparte y conecta con lectores de todo el mundo
      en una comunidad diversa y acogedora.
    </p>

    <!-- Botones -->
    <div class="buttons">
      <button class="btn-primary" @click="goToLogin">
        Iniciar sesión
      </button>

      <button class="btn-secondary" @click="goToRegister">
        Crear cuenta
      </button>
    </div>
  </div>
</template>

<style scoped>
.welcome-container {
  min-height: 100vh;
  background: #F5F0E9; /* Beige fondo */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  font-family: 'Inter', system-ui, sans-serif;
}

.welcome-icon {
  width: 240px;
  height: auto;
  margin-bottom: 3rem;
  filter: drop-shadow(0 10px 20px rgba(139, 111, 71, 0.15));
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  color: #2E5266; /* Azul petróleo */
  margin: 0 0 1.5rem 0;
}

.description {
  font-size: 1.125rem;
  line-height: 1.6;
  color: #6B9080; /* Verde oliva */
  max-width: 540px;
  margin: 0 auto 3.5rem;
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 320px;
}

.btn-primary {
  background: #F9C846; /* Amarillo mostaza */
  color: #2E5266;
  font-size: 1.125rem;
  font-weight: 600;
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 4px 12px rgba(249, 200, 70, 0.3);
}

.btn-primary:hover {
  background: #fde7a5;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(249, 200, 70, 0.4);
}

.btn-secondary {
  background: transparent;
  color: #6B9080; /* Verde oliva */
  font-size: 1.125rem;
  font-weight: 600;
  padding: 1rem 2rem;
  border: 2.5px solid #6B9080;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.25s ease;
}

.btn-secondary:hover {
  background: #6b908040;
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 480px) {
  .title { font-size: 2rem; }
  .welcome-icon { width: 200px; }
}
</style>