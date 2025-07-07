<template>
  <Header />
  <section class="max-w-2xl mx-auto py-16 px-4">
    <h1 class="text-3xl font-bold mb-6">Información de Envíos</h1>
    <p class="mb-4">Realizamos envíos a todo Chile a través de <b>Chilexpress</b>.</p>
    <ul class="list-disc pl-6 mb-4">
      <li>Despachamos tu pedido en un plazo de 1 a 3 días hábiles tras la confirmación del pago.</li>
      <li>El tiempo de entrega depende de la localidad y la empresa de transporte.</li>
      <li>Recibirás un número de seguimiento para rastrear tu pedido en todo momento.</li>
      <li>Los costos de envío se calculan automáticamente al finalizar la compra.</li>
    </ul>
    <p>Si tienes dudas sobre tu envío, contáctanos a <b>calafateponchos.spa@gmail.com</b>.</p>
  </section>
  <Footer />
</template>

<script setup lang="ts">
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
</script> 