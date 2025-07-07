<template>
  <header class="sticky top-0 z-50 w-full bg-black">
    <!-- Sección superior -->
    <section :class="['w-full', isScrolled ? 'backdrop-blur bg-black shadow-md py-2' : 'py-4']">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Contenedor flexible -->
        <div class="flex flex-col md:flex-row items-center justify-between gap-y-4 md:gap-8">
          
          <!-- Logo y menú móvil -->
          <div class="flex items-center justify-between w-full md:w-auto">
            <button 
              class="md:hidden text-white hover:text-amber-400"
              aria-label="Toggle mobile menu"
              @click="isMobileMenuOpen = !isMobileMenuOpen"
            >
              <Icon icon="mdi:menu" class="w-6 h-6" />
            </button>
            
            <a href="/" class="flex items-center mx-auto md:mx-0 md:mr-8 lg:mr-10">
              <img 
                src="/img/logo.png" 
                alt="Calafate Austral" 
                class="h-12 w-auto md:h-14"
              >
            </a>
            
            <!-- Versión móvil: ícono de búsqueda -->
            <button 
              v-if="!showMobileSearch"
              @click="showMobileSearch = true"
              class="md:hidden text-white hover:text-amber-400"
              aria-label="Buscar"
            >
              <Icon icon="mdi:magnify" class="w-6 h-6" />
            </button>
          </div>

          <!-- Barra de búsqueda (desktop) -->
          <form class="hidden md:block flex-1 max-w-md mx-4" role="search" aria-label="Site search" @submit.prevent="handleSearch">
            <div class="relative">
              <input 
                type="text" 
                v-model="searchQuery"
                placeholder="Buscar productos..."
                class="w-full pl-4 pr-10 py-2 text-sm bg-white/10 text-white placeholder-gray-300 rounded-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              >
              <button 
                type="submit" 
                class="absolute right-3 top-1/2 -translate-y-1/2 text-white hover:text-amber-400"
                aria-label="Search button"
              >
                <Icon icon="mdi:magnify" class="w-5 h-5"/>
              </button>
            </div>
          </form>

          <!-- Barra de búsqueda móvil (se muestra al hacer clic) -->
          <transition name="slide-down">
            <div v-if="showMobileSearch" class="md:hidden w-full">
              <form class="relative" role="search" aria-label="Mobile site search" @submit.prevent="handleSearch">
                <input 
                  type="text" 
                  v-model="searchQuery"
                  placeholder="Buscar productos..."
                  class="w-full pl-4 pr-10 py-2 text-sm bg-white/10 text-white placeholder-gray-300 rounded-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                >
                <button 
                  type="button"
                  @click="showMobileSearch = false"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-white hover:text-amber-400"
                  aria-label="Close search"
                >
                  <Icon icon="mdi:close" class="w-5 h-5"/>
                </button>
              </form>
            </div>
          </transition>

            <!-- Íconos de navegación -->
            <div class="flex items-center gap-2 md:gap-4">
  <button class="relative p-2 text-white hover:text-amber-400" aria-label="Wishlist" @click="goToWishlist">
    <Icon icon="mdi:heart-outline" class="w-6 h-6" />
    <span v-if="wishlist.total > 0" class="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{{ wishlist.total }}</span>
  </button>
  
  <!-- Ícono del carrito con sidebar -->
  <div class="relative p-2 text-white hover:text-amber-400" aria-label="Cart">
    <button
      @click="handleCartSidebarClick"
      class="relative flex items-center"
    >
      <Icon icon="mdi:cart-outline" class="w-6 h-6" />
      <span
        v-if="cart.totalItems > 0"
        class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2"
      >{{ cart.totalItems }}</span>
    </button>
  </div>
  
  <!-- Botón de cuenta con menú -->
  <div class="relative">
    <button class="p-2 text-white hover:text-amber-400 flex items-center gap-2" aria-label="Account" @click.stop="handleAccountClick">
      <Icon icon="mdi:account-outline" class="w-6 h-6" />
      <span v-if="isLoggedIn && user?.nombre_u" class="hidden md:inline">{{ user.nombre_u }}</span>
    </button>
    <transition name="fade">
      <div v-if="showUserMenu && isLoggedIn" class="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg z-50">
        <div class="px-4 py-2 text-gray-700 border-b">{{ user?.correo_u }}</div>
        <!-- Enlace especial para superusuarios -->
        <a v-if="user?.is_superuser" href="http://localhost:8000/panel/dashboard/" target="_blank" class="block w-full text-left px-4 py-2 hover:bg-gray-100 text-blue-600">Dashboard de Administración</a>
        <li v-if="authStore.isAuthenticated">
          <router-link to="/mi-cuenta" class="block px-4 py-2 hover:bg-gray-100">Mi cuenta</router-link>
        </li>
        <button class="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600" @click="logout">Cerrar sesión</button>
      </div>
    </transition>
  </div>
</div>
        </div>
      </div>
    </section>

    <!-- Navegación principal -->
    <nav class="bg-black border-t border-gray-800" aria-label="Main navigation">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <!-- Desktop Menu -->
        <ul class="hidden md:flex justify-center space-x-8 py-3 text-sm font-medium text-white">
          <li v-for="item in navItems" :key="item.id" class="relative group">
            <template v-if="!item.children">
              <router-link 
                :to="item.link" 
                class="hover:text-amber-400 transition-colors px-2 py-1 rounded flex items-center"
              >
                {{ item.name }}
              </router-link>
            </template>
            
            <template v-else>
              <button
                class="hover:text-amber-400 transition-colors px-2 py-1 rounded flex items-center"
                @click.stop="toggleDesktopSubmenu(item.id)"
                aria-haspopup="true"
                :aria-expanded="activeDropdown === item.id"
              >
                {{ item.name }}
                <Icon 
                  icon="mdi:chevron-down" 
                  class="w-4 h-4 ml-1 transition-transform duration-200"
                  :class="{'rotate-180': activeDropdown === item.id}"
                />
              </button>
              
              <!-- Submenú desplegable -->
              <transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="opacity-0 translate-y-1"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition ease-in duration-150"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 translate-y-1"
              >
                <div 
                  v-if="activeDropdown === item.id"
                  class="absolute left-1/2 transform -translate-x-1/2 mt-1 w-48 bg-gray-900 rounded-md shadow-lg py-1 z-20"
                  ref="dropdown"
                  @click.stop
                >
                  <router-link 
                    v-for="child in item.children" 
                    :key="child.id"
                    :to="child.link"
                    class="block px-4 py-2 text-sm text-white hover:text-amber-400 hover:bg-gray-800 transition-colors"
                    @click="activeDropdown = null"
                  >
                    {{ child.name }}
                  </router-link>
                </div>
              </transition>
            </template>
          </li>
        </ul>

        <!-- Mobile Menu -->
        <div v-if="isMobileMenuOpen" class="md:hidden bg-gray-900 rounded-lg shadow-lg p-4 space-y-3">
          <div v-for="item in navItems" :key="item.id">
            <router-link 
              v-if="!item.children"
              :to="item.link"
              class="block text-white hover:text-amber-400 text-sm font-medium px-3 py-2 rounded hover:bg-gray-800"
              @click="isMobileMenuOpen = false"
            >
              {{ item.name }}
            </router-link>
            
            <div v-else>
              <button
                class="flex justify-between items-center w-full text-white hover:text-amber-400 text-sm font-medium px-3 py-2 rounded hover:bg-gray-800"
                @click="toggleMobileSubmenu(item.id)"
                aria-haspopup="true"
                :aria-expanded="openMobileSubmenu === item.id"
              >
                <span>{{ item.name }}</span>
                <Icon 
                  icon="mdi:chevron-down" 
                  class="w-4 h-4 transition-transform duration-200"
                  :class="{'rotate-180': openMobileSubmenu === item.id}"
                />
              </button>
              
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="opacity-0 max-h-0"
                enter-to-class="opacity-100 max-h-40"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="opacity-100 max-h-40"
                leave-to-class="opacity-0 max-h-0"
              >
                <div v-if="openMobileSubmenu === item.id" class="pl-4 mt-1 space-y-2 overflow-hidden">
                  <router-link 
                    v-for="child in item.children" 
                    :key="child.id"
                    :to="child.link"
                    class="block text-white hover:text-amber-400 text-sm font-medium px-3 py-2 rounded hover:bg-gray-800"
                    @click="isMobileMenuOpen = false"
                  >
                    {{ child.name }}
                  </router-link>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
  <CartSidebar :open="showCartSidebar" @close="showCartSidebar = false" />
  <!-- Modal de login -->
  <transition name="fade">
    <div v-if="authStore.showLoginModal && !isLoggedIn" class="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div class="bg-white rounded-lg shadow-lg w-full max-w-sm p-8 relative border-t-8 border-yellow-600">
        <button @click="closeLoginModal" class="absolute top-2 right-2 text-gray-400 hover:text-black text-2xl">&times;</button>
        <h2 class="text-xl font-bold mb-6 text-center text-yellow-700">Iniciar Sesión</h2>
        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label class="block font-medium mb-1" for="loginEmail">Email</label>
            <input id="loginEmail" v-model="login.email" type="email" required class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-600" />
          </div>
          <div>
            <label class="block font-medium mb-1" for="loginPassword">Contraseña</label>
            <div class="relative">
              <input :type="showPassword ? 'text' : 'password'" id="loginPassword" v-model="login.password" required minlength="8" class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-600" />
              <button type="button" class="absolute right-2 top-2 text-gray-500" @click="showPassword = !showPassword">
                <Icon :icon="showPassword ? 'mdi:eye-off-outline' : 'mdi:eye-outline'" class="w-5 h-5" />
              </button>
            </div>
            <p class="text-xs text-gray-500 mt-1">Mínimo 8 caracteres</p>
          </div>
          <button type="submit" class="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 rounded transition text-lg mt-4">Iniciar Sesión</button>
        </form>
        <div class="text-center mt-4">
          <a href="#" class="text-yellow-700 hover:underline text-sm">Olvidé mi contraseña</a>
        </div>
        <hr class="my-6" />
        <div class="text-center text-gray-600 mb-2">¿No estás registrado/a?</div>
        <button @click="goToRegister" class="w-full border-2 border-yellow-600 text-yellow-700 font-semibold py-2 rounded hover:bg-yellow-50 transition">Registrarme</button>
        <div v-if="loginError" class="text-red-600 text-center mt-4">{{ loginError }}</div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useCartStore } from '../stores/cart.store'
import { useWishlistStore } from '../stores/products'
import { useRouter } from 'vue-router'
import CartSidebar from './CartSidebar.vue'
import { useToast } from 'vue-toastification'
import { useAuthStore } from '../stores/auth.store'
import axios from 'axios'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const showMobileSearch = ref(false)
const activeDropdown = ref<number | null>(null)
const openMobileSubmenu = ref<number | null>(null)
const dropdown = ref<HTMLElement | null>(null)
const showUserMenu = ref(false)
const showPassword = ref(false)
const searchQuery = ref('')
const loginError = ref('')

const navItems = [
  { id: 1, name: 'Inicio', link: '/' },
  { id: 2, name: 'Categorías',
    children: [
      { id: 21, name: 'Ponchos', link: '/products' + '#ponchos' },
      { id: 22, name: 'Sombreros', link: '/products' + '#sombreros' },
      { id: 23, name: 'Accesorios', link: '/products' + '#accesorios' },
    ]
  },
  { id: 3, name: 'Productos', link: '/products'},
  { id: 4, name: 'Ofertas', link: '/offers' },
  { id: 5, name: 'Nosotros', link: '/about' },
  { id: 6, name: 'Contacto', link: '/contact' },
]

const cart = useCartStore()
const showCartSidebar = ref(false)
const wishlist = useWishlistStore()
const router = useRouter()
const toast = useToast()
const authStore = useAuthStore()

const isLoggedIn = computed(() => authStore.isAuthenticated)
const user = computed(() => authStore.user)
const login = ref({ email: '', password: '' })

onMounted(() => {
  window.addEventListener('click', () => { showUserMenu.value = false })
  window.addEventListener('scroll', handleScroll)
  document.addEventListener('click', handleClickOutside)
  // Al montar, verificar si ya hay sesión
  authStore.checkAuth()
})

onUnmounted(() => {
  window.removeEventListener('click', () => { showUserMenu.value = false })
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', handleClickOutside)
})

function clearLoginFields() {
  login.value.email = ''
  login.value.password = ''
}

async function logout() {
  await authStore.logout();
  toast.info('Sesión cerrada');
  router.push('/');
  clearLoginFields();
}

const toggleDesktopSubmenu = (id: number) => {
  activeDropdown.value = activeDropdown.value === id ? null : id
}

const toggleMobileSubmenu = (id: number) => {
  openMobileSubmenu.value = openMobileSubmenu.value === id ? null : id
}

function goToWishlist() {
  router.push('/wishlist')
}

function handleAccountClick(e: Event) {
  e.stopPropagation()
  if (!isLoggedIn.value) {
    authStore.openLoginModal()
    clearLoginFields();
  } else {
    showUserMenu.value = !showUserMenu.value
  }
}

function closeLoginModal() {
  authStore.closeLoginModal()
  clearLoginFields();
}

async function handleLogin() {
  try {
    // Obtener CSRF antes de intentar login
    await axios.get('/api/csrf/', { withCredentials: true })
    loginError.value = ''
    const success = await authStore.login(login.value.email, login.value.password)
    if (success) {
      closeLoginModal();
      toast.success('¡Bienvenido!');
      window.location.reload();
    } else {
      loginError.value = 'Correo o contraseña incorrectos';
      toast.error('Correo o contraseña incorrectos');
    }
  } catch (e: any) {
    loginError.value = e?.message || 'Correo o contraseña incorrectos';
    toast.error(loginError.value);
  }
}

function goToRegister() {
  closeLoginModal();
  router.push('/register')
}

function handleClickOutside(event: MouseEvent) {
  const dropdown = document.querySelector('[aria-label="Cart"] .absolute')
  if (dropdown && !dropdown.contains(event.target as Node)) {
    showCartSidebar.value = false
  }
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

let lastCartLength = cart.items.length
watch(() => cart.items.length, (newVal) => {
  if (newVal > lastCartLength) {
    showCartSidebar.value = true
  }
  lastCartLength = newVal
})

function handleCartSidebarClick() {
  cart.toggleCart()
}

function handleSearch(e?: Event) {
  if (e) e.preventDefault()
  if (searchQuery.value.trim()) {
    router.push({ path: '/products', query: { q: searchQuery.value.trim() } })
    showMobileSearch.value = false
    searchQuery.value = ''
  }
}
</script>

<style>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
  max-height: 60px;
  overflow: hidden;
}

.slide-down-enter-from,
.slide-down-leave-to {
  max-height: 0;
  opacity: 0;
  padding-bottom: 0;
}

.rotate-180 {
  transform: rotate(180deg);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>