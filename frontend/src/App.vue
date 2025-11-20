<template>
  <!-- Aquí es donde Vue Router cambia las páginas -->
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup>
// No hace falta nada aquí
</script>

<style>
/* Transición suave entre páginas (opcional pero queda muy pro) */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>