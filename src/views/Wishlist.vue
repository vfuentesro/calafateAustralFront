<template>
  <Header />
    <div class="max-w-3xl mx-auto py-10 px-4">
      <h1 class="text-2xl font-bold mb-6">Lista de deseados</h1>
      <div v-if="wishlist.items.length === 0" class="text-gray-500 text-center py-16">
        No tienes productos en tu lista de deseados.
      </div>
      <div v-else>
        <div v-for="item in wishlist.items" :key="item.id" class="flex items-center gap-4 mb-6 border-b pb-4">
          <img :src="item.image" alt="" class="w-20 h-20 rounded object-cover border" />
          <div class="flex-1 flex items-center gap-2">
            <Icon icon="mdi:heart-outline" class="w-6 h-6 text-amber-500" />
            <div class="font-semibold text-lg whitespace-normal break-words w-full">{{ item.name }}</div>
          </div>
          <button @click="goToProduct(item.id)" class="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded transition">Ver producto</button>
          <button @click="wishlist.removeFromWishlist(item.id)" class="ml-2 flex items-center justify-center w-8 h-8 rounded-full bg-red-200 hover:bg-red-400 transition-transform active:scale-90" title="Eliminar">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10" fill="currentColor" fill-opacity="0.15" />
              <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  <Footer />
</template>

<script setup lang="ts">
import { useWishlistStore } from '../stores/products'
import { useRouter } from 'vue-router'  
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import { Icon } from '@iconify/vue'
const wishlist = useWishlistStore()
const router = useRouter()

function goToProduct(id: number) {
  router.push({ name: 'SingleProduct', params: { id } })
}
</script> 