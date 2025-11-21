<template>
  <div class="home">
    <!-- Header fijo -->
    <header class="home-header">
      <h1>El Parche Lector</h1>
      <div class="header-icons">
        <!-- App icon (from public folder) -->
        <button
          class="app-icon"
          aria-label="Ir al inicio"
          @click="router.push('/')"
        >
          <img src="/icon.svg" alt="Icono de la app" class="app-icon-img" />
        </button>

        <!-- Avatar + dropdown wrapper -->
        <div
          class="user-menu-wrapper"
          @mouseenter="openMenu"
          @mouseleave="closeMenu"
        >
          <div
            class="user-avatar"
            role="button"
            :aria-expanded="showMenu"
            @click="toggleMenu"
          >
            <img :src="userAvatar" alt="Avatar" />
          </div>

          <!-- Dropdown menu -->
          <div
            v-show="showMenu"
            class="user-menu"
            @mouseenter="openMenu"
            @mouseleave="closeMenu"
            @click.stop
          >
            <button class="menu-item" @click="goToProfile">
              <span class="menu-emoji">👤</span>
              <span>Mi perfil</span>
            </button>
            <button class="menu-item" @click="goToMyBooks">
              <span class="menu-emoji">📚</span>
              <span>Mis libros</span>
            </button>
            <div class="menu-separator" />
            <button class="menu-item logout" @click="logout">
              <span class="menu-emoji">🚪</span>
              <span>Cerrar sesión</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Left decorative accent (visible en desktop) -->
    <div class="left-accent" aria-hidden="true"></div>

    <!-- Contenido principal -->
    <main class="home-main">
      <section class="welcome-section">
        <h2>¡Hola de nuevo, {{ userName }}! 👋</h2>
        <p>¿Qué vas a leer hoy?</p>
      </section>

      <!-- Libros destacados / en tendencia -->
      <section class="books-section">
        <h3>En tendencia en la comunidad</h3>

        <!-- Search bar -->
        <div class="search-bar">
          <input
            v-model="searchQuery"
            type="search"
            placeholder="Buscar libros por título o autor..."
            aria-label="Buscar libros"
          />
        </div>

        <div class="books-grid">
          <div v-for="book in filteredBooks" :key="book.id" class="book-card">
            <div class="card-actions">
              <button
                class="add-btn"
                @click.stop="toggleBookMenu(book.id)"
                :aria-expanded="activeMenuBookId === book.id"
                aria-label="Agregar libro"
              >
                +
              </button>
              <div
                v-if="activeMenuBookId === book.id"
                class="add-menu"
                @click.stop
              >
                <button
                  class="add-menu-item leido"
                  @click="setBookStatus(book.id, 'leido')"
                >
                  ✔️ <span>Leído</span>
                </button>
                <button
                  class="add-menu-item leyendo"
                  @click="setBookStatus(book.id, 'leyendo')"
                >
                  📖 <span>Leyendo</span>
                </button>
                <button
                  class="add-menu-item por_leer"
                  @click="setBookStatus(book.id, 'por_leer')"
                >
                  🕮 <span>Por leer</span>
                </button>
              </div>
            </div>
            <div class="book-cover">
              <img :src="book.cover" alt="Portada" />
            </div>
            <h4 class="book-title">{{ book.title }}</h4>
            <p class="book-author">{{ book.author }}</p>
            <div class="book-rating">
              <div class="stars" :title="book.rating + ' / 5'">
                <div
                  class="fill"
                  :style="{ width: (book.rating / 5) * 100 + '%' }"
                ></div>
              </div>
              <span class="rating-number">{{ book.rating.toFixed(1) }}</span>
            </div>
            <div v-if="book.status" class="book-status-badge">
              {{ statusLabel(book.status) }}
            </div>
          </div>
        </div>
        <div v-if="filteredBooks.length === 0" class="no-results">
          No se encontraron libros.
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

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { authUtils } from '../utils/auth'

interface Book {
  id: number
  title: string
  author: string
  rating: number
  cover: string
  status?: 'leido' | 'leyendo' | 'por_leer'
}

// Simulamos datos del usuario (luego vendrán de Pinia/Vuex/Firebase)
const userName = ref('Ana')
const userAvatar = ref(
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana&backgroundColor=F9C846'
)

const router = useRouter()
const goToProfile = () => router.push('/profile')

// User menu state and handlers
const showMenu = ref(false)
let closeTimeout: ReturnType<typeof setTimeout> | null = null

const openMenu = () => {
  if (closeTimeout) {
    clearTimeout(closeTimeout)
    closeTimeout = null
  }
  showMenu.value = true
}

const closeMenu = () => {
  // Add a small delay before closing to allow moving mouse to menu
  closeTimeout = setTimeout(() => {
    showMenu.value = false
    closeTimeout = null
  }, 150)
}

const toggleMenu = () => {
  if (closeTimeout) {
    clearTimeout(closeTimeout)
    closeTimeout = null
  }
  showMenu.value = !showMenu.value
}

const goToMyBooks = () => {
  router.push('/my-books')
}
const logout = () => {
  authUtils.removeToken()
  router.push('/welcome')
}

// Libros de ejemplo
const trendingBooks = ref<Book[]>([
  {
    id: 1,
    title: 'Cien años de soledad',
    author: 'Gabriel García Márquez',
    rating: 4.9,
    cover: 'https://picsum.photos/200/300?random=1',
  },
  {
    id: 2,
    title: 'La casa de los espíritus',
    author: 'Isabel Allende',
    rating: 4.6,
    cover: 'https://picsum.photos/200/300?random=2',
  },
  {
    id: 3,
    title: 'Rayuela',
    author: 'Julio Cortázar',
    rating: 4.3,
    cover: 'https://picsum.photos/200/300?random=3',
  },
  {
    id: 4,
    title: 'El amor en los tiempos del cólera',
    author: 'G. García Márquez',
    rating: 4.7,
    cover: 'https://picsum.photos/200/300?random=4',
  },
])

// Search state and derived list
const searchQuery = ref('')
const filteredBooks = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return trendingBooks.value
  return trendingBooks.value.filter((b) => {
    return (
      b.title.toLowerCase().includes(q) ||
      (b.author && b.author.toLowerCase().includes(q))
    )
  })
})

// Add-to-list menu state
const activeMenuBookId = ref<number | null>(null)
const toggleBookMenu = (id: number) => {
  activeMenuBookId.value = activeMenuBookId.value === id ? null : id
}

const setBookStatus = (
  bookId: number,
  status: 'leido' | 'leyendo' | 'por_leer'
) => {
  const book = trendingBooks.value.find((b) => b.id === bookId)
  if (book) {
    book.status = status
    // could call API here to persist the status
  }
  activeMenuBookId.value = null
}

const statusLabel = (s?: string) => {
  if (!s) return ''
  if (s === 'leido') return 'Leído'
  if (s === 'leyendo') return 'Leyendo'
  if (s === 'por_leer') return 'Por leer'
  return s
}
</script>

<style scoped>
.home {
  min-height: 100vh;
  background: #f5f0e9;
  padding-bottom: 80px; /* espacio para el bottom nav */
}

/* Header */
.home-header {
  position: sticky;
  top: 0;
  background: #f5f0e9;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e8e2d9;
  z-index: 10;
}

.home-header h1 {
  font-size: 1.5rem;
  color: #2e5266;
}

.user-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #f9c846;
  cursor: pointer;
  transition: transform 0.2s;
}

.user-avatar:hover {
  transform: scale(1.08);
}
.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Main content */
.home-main {
  padding: 1.5rem;
  max-width: 1000px;
  margin: 0 auto;
}

.header-icons {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.app-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 92px; /* aumentado al menos el doble */
  height: 92px; /* aumentado al menos el doble */
  border-radius: 14px;
  background: linear-gradient(
    180deg,
    rgba(249, 200, 70, 0.08),
    rgba(46, 82, 102, 0.02)
  );
  border: 1px solid rgba(46, 82, 102, 0.06);
  cursor: pointer;
  transition: transform 0.12s, box-shadow 0.12s;
  padding: 8px;
}
.app-icon-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}
.app-icon:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 22px rgba(46, 82, 102, 0.08);
}

/* Left accent stripe */
.left-accent {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 180px; /* más ancho: se extiende hacia la derecha */
  background: radial-gradient(
      circle at 20% 18%,
      rgba(249, 200, 70, 0.12),
      transparent 20%
    ),
    repeating-linear-gradient(
      45deg,
      rgba(46, 82, 102, 0.025) 0 2px,
      transparent 2px 8px
    ),
    linear-gradient(
      180deg,
      rgba(249, 200, 70, 0.18) 0%,
      rgba(245, 240, 233, 0.9) 60%
    );
  opacity: 0.98;
  pointer-events: none;
  z-index: 5;
  border-top-right-radius: 14px;
  border-bottom-right-radius: 14px;
  box-shadow: 2px 0 18px rgba(46, 82, 102, 0.05);
  overflow: hidden;
}

/* Shift main content to avoid overlap on desktop */
@media (min-width: 768px) {
  .home-main {
    margin-left: 200px;
  }
  .home-header {
    padding-left: 3rem;
    padding-right: 2rem;
  }
}

@media (max-width: 767px) {
  .left-accent {
    display: none;
  }
  .app-icon {
    width: 56px;
    height: 56px;
  }
}

/* User menu styles */
.user-menu-wrapper {
  position: relative;
}
.user-menu {
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  width: 220px;
  background: linear-gradient(180deg, #ffffff, #fffdf7);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(46, 82, 102, 0.12);
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  z-index: 40;
  border: 1px solid rgba(46, 82, 102, 0.06);
}
/* Bridge the gap between avatar and menu for hover */
.user-menu::before {
  content: '';
  position: absolute;
  top: -8px;
  left: 0;
  right: 0;
  height: 8px;
  background: transparent;
}
.menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 10px;
  background: transparent;
  color: #2e5266;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.12s, transform 0.08s;
}
.menu-item:hover {
  background: rgba(249, 200, 70, 0.08);
  transform: translateY(-1px);
}
.menu-emoji {
  font-size: 1.05rem;
}
.menu-separator {
  height: 1px;
  background: rgba(46, 82, 102, 0.04);
  margin: 4px 4px;
  border-radius: 2px;
}
.menu-item.logout {
  color: #b23a48;
}

/* Small screens: show menu full width under header */
@media (max-width: 767px) {
  .user-menu {
    right: 8px;
    left: 8px;
    width: auto;
  }
}

.welcome-section h2 {
  font-size: 1.8rem;
  color: #2e5266;
  margin-bottom: 0.5rem;
}

.welcome-section p {
  color: #6b9080;
  font-size: 1.1rem;
}

.books-section {
  margin-top: 2.5rem;
}

.books-section h3 {
  font-size: 1.4rem;
  color: #2e5266;
  margin-bottom: 1rem;
}

.search-bar {
  margin-bottom: 1rem;
  max-width: 640px;
  position: relative;
}
.search-bar::before {
  content: '🔍';
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1rem;
  color: #6b9080;
  pointer-events: none;
}
.search-bar input {
  width: 100%;
  padding: 0.55rem 0.75rem 0.55rem 3.2rem; /* espacio para el icono */
  border-radius: 999px; /* estilo pill */
  border: 1px solid rgba(46, 82, 102, 0.06);
  background: linear-gradient(180deg, #ffffff 0%, #fffdf7 100%);
  box-shadow: 0 2px 8px rgba(46, 82, 102, 0.06) inset;
  font-size: 0.95rem;
  color: #2e5266;
  transition: box-shadow 0.18s, border-color 0.18s, transform 0.12s;
}
.search-bar input::placeholder {
  color: #a8b7ad;
}
.search-bar input:focus {
  outline: none;
  border-color: #f9c846;
  box-shadow: 0 0 0 6px rgba(249, 200, 70, 0.1);
  transform: translateY(-1px);
}
.no-results {
  margin-top: 1rem;
  color: #8b6f47;
  text-align: center;
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 1.5rem;
}

.book-card {
  background: #fdfbf7;
  border-radius: 16px;
  overflow: visible; /* permitir que los menús floten fuera de la tarjeta */
  box-shadow: 0 6px 20px rgba(139, 111, 71, 0.12);
  transition: transform 0.25s;
}

.book-card:hover {
  transform: translateY(-6px);
}

.book-cover {
  height: 200px;
  background: #e8e2d9;
}

.book-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.book-title {
  font-size: 0.95rem;
  margin: 0.75rem 0.75rem 0;
  color: #2e5266;
  font-weight: 600;
}

.book-author {
  font-size: 0.85rem;
  margin: 0.25rem 0.75rem 0.75rem;
  color: #6b9080;
}

.book-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 0.75rem 0.8rem 0.75rem;
}
.stars {
  position: relative;
  display: inline-block;
  font-size: 1rem;
  line-height: 1;
  width: 86px; /* space for 5 stars */
  height: 18px;
}
.stars::before {
  content: '★★★★★';
  color: #e6e6e6;
  letter-spacing: 3px;
  font-size: 1rem;
}
.stars .fill {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  overflow: hidden;
  white-space: nowrap;
}
.stars .fill::before {
  content: '★★★★★';
  color: #f9c846;
  letter-spacing: 3px;
  font-size: 1rem;
}
.rating-number {
  font-size: 0.9rem;
  color: #6b9080;
  font-weight: 700;
}

/* Card actions: add button + menu */
.book-card {
  position: relative;
}
.card-actions {
  position: absolute;
  right: 10px;
  top: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 30;
}
.add-btn {
  width: 36px; /* más pequeño */
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(180deg, #f9c846, #f5e0a0);
  color: #2e5266;
  font-size: 1.05rem;
  font-weight: 800;
  border: none;
  cursor: pointer;
  box-shadow: 0 6px 14px rgba(139, 111, 71, 0.1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.12s, box-shadow 0.12s;
  padding: 0;
}
.add-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 22px rgba(139, 111, 71, 0.12);
}
.add-menu {
  position: absolute;
  right: 0;
  top: 48px;
  width: 180px;
  background: linear-gradient(180deg, #ffffff, #fffdf7);
  border-radius: 12px;
  padding: 6px;
  box-shadow: 0 10px 30px rgba(46, 82, 102, 0.12);
  border: 1px solid rgba(46, 82, 102, 0.06);
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 999; /* asegurar que esté por encima y no se recorte */
}
.add-menu-item {
  background: transparent;
  border: none;
  text-align: left;
  padding: 8px 10px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 700;
  color: #2e5266;
  display: flex;
  align-items: center;
  gap: 8px;
}
.add-menu-item span {
  flex: 1;
}
.add-menu-item:hover {
  transform: translateY(-1px);
}
/* Differentiated option styles */
.add-menu-item.leido {
  background: linear-gradient(90deg, rgba(107, 144, 128, 0.12), transparent);
  border-left: 4px solid #6b9080;
}
.add-menu-item.leyendo {
  background: linear-gradient(90deg, rgba(249, 200, 70, 0.12), transparent);
  border-left: 4px solid #f9c846;
}
.add-menu-item.por_leer {
  background: linear-gradient(90deg, rgba(46, 82, 102, 0.06), transparent);
  border-left: 4px solid #2e5266;
  color: #2e5266;
}
.add-menu-item.leido:hover {
  background: linear-gradient(90deg, rgba(107, 144, 128, 0.18), transparent);
}
.add-menu-item.leyendo:hover {
  background: linear-gradient(90deg, rgba(249, 200, 70, 0.18), transparent);
}
.add-menu-item.por_leer:hover {
  background: linear-gradient(90deg, rgba(46, 82, 102, 0.1), transparent);
}
.book-status-badge {
  position: absolute;
  left: 12px;
  top: 12px;
  background: rgba(46, 82, 102, 0.06);
  color: #2e5266;
  padding: 6px 8px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.75rem;
}

/* Bottom navigation (móvil) */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fdfbf7;
  display: flex;
  justify-content: space-around;
  padding: 0.75rem 0;
  border-top: 1px solid #e8e2d9;
  z-index: 100;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: #6b9080;
  text-decoration: none;
  font-size: 0.85rem;
}

.nav-item.active {
  color: #f9c846;
  font-weight: 600;
}

@media (min-width: 768px) {
  .bottom-nav {
    display: none;
  } /* se oculta en desktop */
}
</style>
