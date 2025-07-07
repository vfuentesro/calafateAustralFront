<template>
  <Header />
  <div class="max-w-2xl mx-auto py-16 px-4 text-center">
    <h1 class="text-3xl font-bold mb-6 text-green-600">¡Pago simulado exitoso!</h1>
    <p class="text-lg mb-4">Gracias por tu compra. Este es un flujo de pago de demostración (mock).</p>
    <router-link to="/" class="inline-block mt-6 px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition font-semibold text-lg">
      Volver al inicio
    </router-link>
  </div>
  <Footer />
</template>

<script setup lang="ts">
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
</script> 