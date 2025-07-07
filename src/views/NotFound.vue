<template>
  <div>
    <Header />
    <div class="min-h-[60vh] flex flex-col items-center justify-center py-16 bg-white">
      <h1 class="text-6xl font-bold text-yellow-700 mb-4">404</h1>
      <h2 class="text-2xl font-semibold mb-2">Página no encontrada</h2>
      <p class="mb-6 text-gray-600">La página que buscas no existe o ha sido movida.</p>
      <router-link to="/" class="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 px-8 rounded-lg transition text-lg">Volver al inicio</router-link>
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
</script> 