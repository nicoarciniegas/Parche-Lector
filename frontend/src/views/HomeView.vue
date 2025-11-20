<template>
  <div class="home">
    <!-- Header fijo -->
    <header class="home-header">
      <h1>Lectura Compartida</h1>
      <div class="user-avatar" @click="goToProfile">
        <img :src="userAvatar" alt="Avatar" />
      </div>
    </header>

    <!-- Contenido principal -->
    <main class="home-main">
      <section class="welcome-section">
        <h2>¡Hola de nuevo, {{ userName }}! 👋</h2>
        <p>¿Qué vas a leer hoy?</p>
      </section>

      <!-- Libros destacados / en tendencia -->
      <section class="books-section">
        <h3>En tendencia en la comunidad</h3>
        <div class="books-grid">
          <div v-for="book in trendingBooks" :key="book.id" class="book-card">
            <div class="book-cover">
              <img :src="book.cover" alt="Portada" />
            </div>
            <h4 class="book-title">{{ book.title }}</h4>
            <p class="book-author">{{ book.author }}</p>
            <div class="book-stats">
              <span>❤️ {{ book.likes }}</span>
              <span>💬 {{ book.comments }}</span>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Bottom navigation (opcional, para móvil) -->
    <nav class="bottom-nav">
      <router-link to="/home" class="nav-item active">
        <span>🏠</span> Inicio
      </router-link>
      <router-link to="/explore" class="nav-item">
        <span>MagnifyingGlass</span> Explorar
      </router-link>
      <router-link to="/profile" class="nav-item">
        <span>Person</span> Perfil
      </router-link>
    </nav>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Simulamos datos del usuario (luego vendrán de Pinia/Vuex/Firebase)
const userName = ref('Ana')
const userAvatar = ref('https://api.dicebear.com/7.x/avataaars/svg?seed=Ana&backgroundColor=F9C846')

const router = useRouter()
const goToProfile = () => router.push('/profile')

// Libros de ejemplo
const trendingBooks = ref([
  { id: 1, title: 'Cien años de soledad', author: 'Gabriel García Márquez', likes: 842, comments: 67, cover: 'https://picsum.photos/200/300?random=1' },
  { id: 2, title: 'La casa de los espíritus', author: 'Isabel Allende', likes: 719, comments: 54, cover: 'https://picsum.photos/200/300?random=2' },
  { id: 3, title: 'Rayuela', author: 'Julio Cortázar', likes: 623, comments: 89, cover: 'https://picsum.photos/200/300?random=3' },
  { id: 4, title: 'El amor en los tiempos del cólera', author: 'G. García Márquez', likes: 581, comments: 42, cover: 'https://picsum.photos/200/300?random=4' },
])
</script>

<style scoped>
.home {
  min-height: 100vh;
  background: #F5F0E9;
  padding-bottom: 80px; /* espacio para el bottom nav */
}

/* Header */
.home-header {
  position: sticky;
  top: 0;
  background: #F5F0E9;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #E8E2D9;
  z-index: 10;
}

.home-header h1 {
  font-size: 1.5rem;
  color: #2E5266;
}

.user-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #F9C846;
  cursor: pointer;
  transition: transform 0.2s;
}

.user-avatar:hover { transform: scale(1.08); }
.user-avatar img { width: 100%; height: 100%; object-fit: cover; }

/* Main content */
.home-main {
  padding: 1.5rem;
  max-width: 1000px;
  margin: 0 auto;
}

.welcome-section h2 {
  font-size: 1.8rem;
  color: #2E5266;
  margin-bottom: 0.5rem;
}

.welcome-section p {
  color: #6B9080;
  font-size: 1.1rem;
}

.books-section {
  margin-top: 2.5rem;
}

.books-section h3 {
  font-size: 1.4rem;
  color: #2E5266;
  margin-bottom: 1rem;
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 1.5rem;
}

.book-card {
  background: #FDFBF7;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(139, 111, 71, 0.12);
  transition: transform 0.25s;
}

.book-card:hover {
  transform: translateY(-6px);
}

.book-cover {
  height: 200px;
  background: #E8E2D9;
}

.book-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.book-title {
  font-size: 0.95rem;
  margin: 0.75rem 0.75rem 0;
  color: #2E5266;
  font-weight: 600;
}

.book-author {
  font-size: 0.85rem;
  margin: 0.25rem 0.75rem 0.75rem;
  color: #6B9080;
}

.book-stats {
  display: flex;
  justify-content: space-around;
  padding: 0.5rem;
  font-size: 0.8rem;
  color: #8B6F47;
  background: #fdfbf740;
}

/* Bottom navigation (móvil) */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #FDFBF7;
  display: flex;
  justify-content: space-around;
  padding: 0.75rem 0;
  border-top: 1px solid #E8E2D9;
  z-index: 100;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: #6B9080;
  text-decoration: none;
  font-size: 0.85rem;
}

.nav-item.active {
  color: #F9C846;
  font-weight: 600;
}

@media (min-width: 768px) {
  .bottom-nav { display: none; } /* se oculta en desktop */
}
</style>