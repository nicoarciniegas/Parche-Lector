<template>
  <div class="profile-page">
    <header class="profile-header">
      <div class="profile-left">
        <div class="avatar-large">
          <img :src="userAvatar" alt="Avatar" />
        </div>
        <div class="user-info">
          <h1>{{ userName }}</h1>
          <p class="user-bio">{{ bio }}</p>
          <div class="user-stats">
            <div class="stat">
              <div class="stat-num">{{ followers }}</div>
              <div class="stat-label">Seguidores</div>
            </div>
            <div class="stat">
              <div class="stat-num">{{ following }}</div>
              <div class="stat-label">Seguidos</div>
            </div>
            <div class="stat">
              <div class="stat-num">{{ userBooks.length }}</div>
              <div class="stat-label">Mis libros</div>
            </div>
          </div>
        </div>
      </div>
      <div class="profile-actions">
        <button class="btn primary" @click="openEdit">Editar perfil</button>
        <button class="btn outline" @click="logout">Cerrar sesión</button>
      </div>
    </header>

    <!-- Edit Profile Modal -->
    <div v-if="showEdit" class="modal-overlay" @click.self="closeEdit">
      <div class="modal">
        <header class="modal-header">
          <h3>Editar perfil</h3>
        </header>
        <div class="modal-body">
          <div class="form-row">
            <label>Nombre</label>
            <input v-model="editName" type="text" />
          </div>
          <div class="form-row">
            <label>Bio</label>
            <textarea v-model="editBio" rows="4"></textarea>
          </div>
          <div class="form-row">
            <label>Avatar (URL)</label>
            <input v-model="editAvatar" type="text" />
            <div class="avatar-preview"><img :src="editAvatar || userAvatar" alt="Preview"/></div>
          </div>
        </div>
        <footer class="modal-footer">
          <button class="btn outline" @click="closeEdit">Cancelar</button>
          <button class="btn primary" @click="saveEdit">Guardar</button>
        </footer>
      </div>
    </div>

    <main class="profile-main">
      <section class="section">
        <h2>Mis libros</h2>
        <div class="books-split">
          <div class="books-column">
            <div class="column-header">
              <h3>Leyendo</h3>
              <span class="count">{{ readingBooks.length }}</span>
            </div>
            <div class="books-grid">
              <div v-for="b in readingBooks" :key="b.id" class="book-card">
                <div class="book-cover"><img :src="b.cover" alt="Portada"/></div>
                <h4 class="book-title">{{ b.title }}</h4>
                <p class="book-author">{{ b.author }}</p>
                <div class="book-rating">
                  <div class="stars" :title="b.rating + ' / 5'">
                    <div class="fill" :style="{ width: (b.rating / 5 * 100) + '%' }"></div>
                  </div>
                  <span class="rating-number">{{ b.rating.toFixed(1) }}</span>
                </div>
                <div v-if="b.status" class="book-status">{{ statusLabel(b.status) }}</div>
              </div>
              <div v-if="readingBooks.length === 0" class="no-items">No hay libros en esta categoría.</div>
            </div>
          </div>

          <div class="books-column">
            <div class="column-header">
              <h3>Leídos</h3>
              <span class="count">{{ readBooks.length }}</span>
            </div>
            <div class="books-grid">
              <div v-for="b in readBooks" :key="b.id" class="book-card">
                <div class="book-cover"><img :src="b.cover" alt="Portada"/></div>
                <h4 class="book-title">{{ b.title }}</h4>
                <p class="book-author">{{ b.author }}</p>
                <div class="book-rating">
                  <div class="stars" :title="b.rating + ' / 5'">
                    <div class="fill" :style="{ width: (b.rating / 5 * 100) + '%' }"></div>
                  </div>
                  <span class="rating-number">{{ b.rating.toFixed(1) }}</span>
                </div>
                <div v-if="b.status" class="book-status">{{ statusLabel(b.status) }}</div>
              </div>
              <div v-if="readBooks.length === 0" class="no-items">No hay libros en esta categoría.</div>
            </div>
          </div>

          <div class="books-column">
            <div class="column-header">
              <h3>Por leer</h3>
              <span class="count">{{ toReadBooks.length }}</span>
            </div>
            <div class="books-grid">
              <div v-for="b in toReadBooks" :key="b.id" class="book-card">
                <div class="book-cover"><img :src="b.cover" alt="Portada"/></div>
                <h4 class="book-title">{{ b.title }}</h4>
                <p class="book-author">{{ b.author }}</p>
                <div class="book-rating">
                  <div class="stars" :title="b.rating + ' / 5'">
                    <div class="fill" :style="{ width: (b.rating / 5 * 100) + '%' }"></div>
                  </div>
                  <span class="rating-number">{{ b.rating.toFixed(1) }}</span>
                </div>
                <div v-if="b.status" class="book-status">{{ statusLabel(b.status) }}</div>
              </div>
              <div v-if="toReadBooks.length === 0" class="no-items">No hay libros en esta categoría.</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const userName = ref('Ana')
const userAvatar = ref('https://api.dicebear.com/7.x/avataaars/svg?seed=Ana&backgroundColor=F9C846')
const bio = ref('Apasionada lectora. Me gusta descubrir autores clásicos y nuevas voces. Compartiendo reseñas y recomendaciones aquí.')
const followers = ref(128)
const following = ref(42)

const userBooks = ref([
  { id: 101, title: 'Cien años de soledad', author: 'Gabriel García Márquez', rating: 4.9, cover: 'https://picsum.photos/200/300?random=11', status: 'leido' },
  { id: 102, title: 'Rayuela', author: 'Julio Cortázar', rating: 4.3, cover: 'https://picsum.photos/200/300?random=12', status: 'leyendo' },
  { id: 103, title: 'La casa de los espíritus', author: 'Isabel Allende', rating: 4.6, cover: 'https://picsum.photos/200/300?random=13', status: 'por_leer' },
])

const readingBooks = computed(() => userBooks.value.filter(b => b.status === 'leyendo'))
const readBooks = computed(() => userBooks.value.filter(b => b.status === 'leido'))
const toReadBooks = computed(() => userBooks.value.filter(b => b.status === 'por_leer'))

// Edit profile modal state and handlers
const showEdit = ref(false)
const editName = ref('')
const editBio = ref('')
const editAvatar = ref('')

const openEdit = () => {
  editName.value = userName.value
  editBio.value = bio.value
  editAvatar.value = userAvatar.value
  showEdit.value = true
}
const closeEdit = () => { showEdit.value = false }
const saveEdit = () => {
  // Basic validation
  if (!editName.value.trim()) { alert('El nombre no puede quedar vacío'); return }
  userName.value = editName.value.trim()
  bio.value = editBio.value.trim()
  userAvatar.value = editAvatar.value.trim() || userAvatar.value
  showEdit.value = false
}
const logout = () => { try { localStorage.removeItem('authToken') } catch(e){}; router.push('/login') }

const statusLabel = (s) => {
  if (!s) return ''
  if (s === 'leido') return 'Leído'
  if (s === 'leyendo') return 'Leyendo'
  if (s === 'por_leer') return 'Por leer'
  return s
}
</script>

<style scoped>
:root { --bg: #F5F0E9; --accent: #F9C846; --primary: #2E5266; --muted: #6B9080; }
.profile-page { min-height: 100vh; background: var(--bg); padding-bottom: 80px; }
.profile-header { display:flex; justify-content:space-between; align-items:flex-start; gap:20px; padding: 1.5rem; max-width:1000px; margin: 0 auto; }
.profile-left { display:flex; gap:18px; align-items:center; }
.avatar-large { width:120px; height:120px; border-radius:18px; overflow:hidden; border:4px solid var(--accent); }
.avatar-large img { width:100%; height:100%; object-fit:cover }
.user-info h1 { margin:0; color:var(--primary); font-size:1.6rem }
.user-bio { margin:6px 0 10px; color:var(--muted); max-width:560px }
.user-stats { display:flex; gap:18px }
.stat { text-align:center }
.stat-num { font-weight:800; color:var(--primary) }
.stat-label { color:var(--muted); font-size:0.85rem }
.profile-actions { display:flex; gap:10px; align-items:center }
.btn { padding:8px 12px; border-radius:10px; cursor:pointer; font-weight:700 }
.btn.primary { background: linear-gradient(180deg,var(--accent), #F5E0A0); border: none; color:var(--primary) }
.btn.outline { background:transparent; border:1px solid rgba(46,82,102,0.08); color:var(--primary) }
.profile-main { max-width:1000px; margin: 0 auto; padding: 0 1.5rem 2rem }
.section h2 { color:var(--primary); margin-bottom:12px }
.books-split { display:flex; gap:1.25rem; flex-direction:column }
.books-column { flex:1 }
.column-header { display:flex; align-items:center; justify-content:flex-start; gap:8px; margin-bottom:10px }
.column-header h3 { margin:0; color:var(--primary); font-size:1.05rem; display:flex; align-items:center }
.count { background:rgba(46,82,102,0.06); color:var(--primary); padding:6px 8px; border-radius:999px; font-weight:800; font-size:0.95rem }
.books-grid { display:grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap:1.25rem }
.book-card { background:#FDFBF7; border-radius:16px; overflow:visible; box-shadow:0 6px 20px rgba(139,111,71,0.12); padding-bottom:8px; position:relative; transition: transform 0.25s }
.book-card:hover { transform: translateY(-6px) }
.book-cover { height:160px; background:#E8E2D9 }
.book-cover img { width:100%; height:100%; object-fit:cover }
.book-title { font-size:0.95rem; color:var(--primary); margin:10px 10px 0; font-weight:700 }
.book-author { color:var(--muted); margin:6px 10px }
.book-rating { display:flex; align-items:center; gap:8px; padding:6px 10px }
.stars { position:relative; display:inline-block; font-size:0.95rem; width:86px; height:16px }
.stars::before { content:'★★★★★'; color:#E6E6E6; letter-spacing:3px }
.stars .fill { position:absolute; left:0; top:0; height:100%; overflow:hidden; white-space:nowrap }
.stars .fill::before { content:'★★★★★'; color:var(--accent); letter-spacing:3px }
.rating-number { color:var(--muted); font-weight:700 }
.book-status { padding:6px 8px; display:inline-block; margin:8px; border-radius:999px; background:rgba(46,82,102,0.06); color:var(--primary); font-weight:800 }
.no-items { color:var(--muted); padding:8px 4px }
@media (min-width:768px) { .profile-page { padding-left:200px } }

/* Modal styles */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(18, 23, 28, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1200;
}
.modal {
  width: 920px;
  max-width: calc(100% - 40px);
  background: linear-gradient(180deg,#FFFFFF,#FFFDF7);
  border-radius: 12px;
  box-shadow: 0 20px 50px rgba(46,82,102,0.18);
  border: 1px solid rgba(46,82,102,0.06);
  overflow: hidden;
}

.modal-header { padding: 16px 20px; border-bottom: 1px solid rgba(46,82,102,0.04) }
.modal-header h3 { margin: 0; font-size: 1.1rem; color: var(--primary); font-weight: 800 }
.modal-body { padding: 16px 20px; display:flex; flex-direction:column; gap:12px; font-family: inherit }
.form-row { display:flex; gap:12px; align-items:center }
.form-row label { width:110px; color:var(--primary); font-weight:700; font-size:0.95rem }
/* Inputs styled to match global palette and rounded corners */
.form-row input,
.form-row textarea {
  flex:1;
  padding:10px 12px;
  border-radius:12px;
  border:1px solid rgba(46,82,102,0.08);
  background: linear-gradient(180deg,#FFFFFF,#FFFDF7);
  box-shadow: inset 0 2px 6px rgba(46,82,102,0.03);
  font-size:0.95rem;
  color:var(--primary);
  font-family: inherit;
}
.form-row textarea { min-height:88px; resize:vertical }
.avatar-preview { width:84px; height:84px; border-radius:10px; overflow:hidden; border:2px solid rgba(46,82,102,0.04) }
.avatar-preview img { width:100%; height:100%; object-fit:cover }
.modal-footer { padding:12px 20px; display:flex; gap:10px; justify-content:flex-end; border-top:1px solid rgba(46,82,102,0.04) }

@media (max-width:720px) {
  .modal { width: calc(100% - 24px) }
  .form-row { flex-direction:column; align-items:flex-start }
  .form-row label { width:100% }
}
</style>
