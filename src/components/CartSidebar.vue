<template>
  <transition name="sidebar-fade">
    <div v-if="cart.isOpen" class="fixed inset-0 z-50 flex">
      <!-- Overlay -->
      <div class="fixed inset-0 bg-black/40 transition-opacity" @click="closeSidebar" />
      <!-- Sidebar -->
      <aside :class="['relative ml-auto w-full max-w-md bg-gray-900 h-full shadow-2xl flex flex-col animate-slide-in', 'sm:rounded-none', mobileSidebarClass]">
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-5 border-b border-gray-800 bg-black">
          <h2 class="text-2xl font-bold text-white">Resumen</h2>
          <button @click="closeSidebar" class="text-gray-400 hover:text-amber-400 p-2 rounded-full transition">
            <Icon icon="mdi:close" class="w-6 h-6" />
          </button>
        </div>
        <!-- Productos -->
        <div ref="scrollArea" class="flex-1 overflow-y-auto px-6 py-4">
          <template v-if="visibleItems.length > 0">
            <div v-for="item in visibleItems" :key="item.product.id_producto" class="flex items-center gap-4 mb-6 last:mb-0">
              <img :src="item.product.imagen" alt="" class="w-16 h-16 rounded object-cover border border-gray-700" />
              <div class="flex-1 min-w-0">
                <div class="font-medium text-white truncate">{{ item.product.nombre_p }}</div>
                <div class="text-xs text-gray-400 truncate">x{{ item.quantity }}</div>
                <div class="flex items-center gap-2 mt-2">
                  <button @click="cart.updateQuantity(item.product.id_producto, item.quantity - 1)" class="w-7 h-7 rounded-full bg-gray-800 hover:bg-gray-700 text-white flex items-center justify-center">-</button>
                  <span class="px-2 text-white">{{ item.quantity }}</span>
                  <button @click="cart.updateQuantity(item.product.id_producto, item.quantity + 1)" class="w-7 h-7 rounded-full bg-gray-800 hover:bg-gray-700 text-white flex items-center justify-center">+</button>
                </div>
              </div>
              <div class="flex flex-col items-end">
                <span class="font-semibold text-base text-amber-500">${{ (item.product.precio_p * item.quantity).toLocaleString() }}</span>
                <button @click="handleRemove(item.product.id_producto)" class="mt-2 flex items-center justify-center w-7 h-7 rounded-full bg-red-200 hover:bg-red-400 transition" title="Eliminar">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10" fill="currentColor" fill-opacity="0.15" />
                    <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                  </svg>
                </button>
              </div>
            </div>
            <div ref="infiniteScrollTrigger" class="h-6"></div>
          </template>
          <template v-else>
            <div class="text-center text-gray-400 py-16">El carrito está vacío</div>
          </template>
        </div>
        <!-- Resumen y acciones -->
        <div class="border-t border-gray-800 px-6 py-5 bg-gradient-to-t from-gray-900 to-gray-800 flex flex-col gap-3">
          <div class="flex justify-between font-semibold text-base text-white">
            <span>Subtotal:</span>
            <span>${{ cart.totalAmount.toLocaleString() }}</span>
          </div>
          <div class="flex flex-col gap-1 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-400">Precio transferencia</span>
              <span class="font-semibold text-amber-500">${{ (cart.totalAmount * 0.97).toLocaleString() }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Otros medios</span>
              <span class="font-semibold text-white">${{ cart.totalAmount.toLocaleString() }}</span>
            </div>
          </div>
          <div class="flex gap-2 mt-3">
            <button class="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded transition text-base" @click="checkout">Iniciar pago</button>
            <button class="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 rounded transition text-base" @click="goToCart">Ir al carro</button>
          </div>
        </div>
      </aside>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useCartStore } from '../stores/cart.store'
import { ref, watch, onMounted, computed, h } from 'vue'
import { useToast } from 'vue-toastification'

const cart = useCartStore()
const toast = useToast()

// Responsive sidebar class
const mobileSidebarClass = computed(() => {
  if (window.innerWidth < 640) return 'max-w-full w-full rounded-none';
  return '';
})

// Infinite scroll logic
const visibleCount = ref(8)
const visibleItems = computed(() => cart.items.slice(0, visibleCount.value))
const scrollArea = ref<HTMLElement | null>(null)
const infiniteScrollTrigger = ref<HTMLElement | null>(null)

function loadMore() {
  if (visibleCount.value < cart.items.length) {
    visibleCount.value += 8
  }
}

let observer: IntersectionObserver | null = null

onMounted(() => {
  // Infinite scroll
  observer = new window.IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      loadMore()
    }
  }, { root: scrollArea.value, threshold: 1 })
  watch(() => cart.isOpen, (val) => {
    if (val && infiniteScrollTrigger.value) {
      observer?.observe(infiniteScrollTrigger.value)
    } else if (infiniteScrollTrigger.value) {
      observer?.unobserve(infiniteScrollTrigger.value)
      visibleCount.value = 8
    }
  }, { immediate: true })
})

function closeSidebar() {
  cart.toggleCart()
}
function checkout() {
  closeSidebar()
  window.location.href = '/checkout'
}
function goToCart() {
  closeSidebar()
  window.location.href = '/cart'
}

function handleRemove(id: number) {
  cart.removeItem(id)
  toast.error('Producto eliminado del carrito', {
    icon: h(Icon, { icon: 'mdi:close-circle', style: 'color:#dc2626; fontSize:1.5em; marginRight:"0.5em";' }),
    timeout: 2500,
    closeOnClick: true,
    hideProgressBar: false,
    toastClassName: 'bg-red-600 text-white',
    bodyClassName: 'flex items-center',
  })
}
</script>

<style scoped>
.sidebar-fade-enter-active,
.sidebar-fade-leave-active {
  transition: opacity 0.2s;
}
.sidebar-fade-enter-from,
.sidebar-fade-leave-to {
  opacity: 0;
}
.animate-slide-in {
  animation: slideInRight 0.3s cubic-bezier(0.4,0,0.2,1);
}
@keyframes slideInRight {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
@media (max-width: 640px) {
  aside {
    max-width: 100vw !important;
    width: 100vw !important;
    border-radius: 0 !important;
  }
}
</style> 