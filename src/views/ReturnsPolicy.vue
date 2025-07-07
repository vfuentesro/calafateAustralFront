<template>
  <Header />
  <div class="max-w-2xl mx-auto py-10 px-4">
    <h1 class="text-2xl font-bold mb-6">Política de Devoluciones</h1>
    <p class="mb-4">En Calafate Austral, queremos que estés satisfecho con tu compra. Si no estás conforme con tu producto, puedes solicitar una devolución dentro de los 10 días siguientes a la recepción del pedido.</p>
    <ul class="list-disc pl-6 mb-4 text-gray-700">
      <li>El producto debe estar sin uso, en su empaque original y con todos sus accesorios.</li>
      <li>Para iniciar el proceso, contáctanos a través de la página de contacto indicando tu número de pedido y motivo de la devolución.</li>
      <li>Una vez recibido y revisado el producto, te reembolsaremos el monto correspondiente.</li>
      <li>Los costos de envío por devolución corren por cuenta del cliente, salvo error nuestro o producto defectuoso.</li>
    </ul>
    <router-link to="/" class="text-blue-600 hover:underline">Volver al inicio</router-link>
  </div>
  <Footer />
</template>

<script setup lang="ts">
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
</script> 