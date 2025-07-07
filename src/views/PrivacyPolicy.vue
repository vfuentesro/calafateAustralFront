<template>
  <Header />
  <div class="max-w-2xl mx-auto py-10 px-4">
    <h1 class="text-2xl font-bold mb-6">Política de Privacidad</h1>
    <p class="mb-4">En Calafate Austral, nos comprometemos a proteger la privacidad y los datos personales de nuestros clientes. Toda la información que recopilamos es utilizada únicamente para procesar pedidos, mejorar la experiencia de compra y cumplir con obligaciones legales.</p>
    <ul class="list-disc pl-6 mb-4 text-gray-700">
      <li>No compartimos tus datos con terceros, salvo para cumplir con el despacho o requerimientos legales.</li>
      <li>Puedes solicitar la eliminación o modificación de tus datos en cualquier momento contactándonos.</li>
      <li>Utilizamos medidas de seguridad para proteger tu información.</li>
    </ul>
    <router-link to="/" class="text-blue-600 hover:underline">Volver al inicio</router-link>
  </div>
  <Footer />
</template>

<script setup lang="ts">
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
</script> 