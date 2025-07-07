<template>
  <Header />
  <section class="max-w-2xl mx-auto py-16 px-4">
    <h1 class="text-3xl font-bold mb-6">Métodos de Pago</h1>
    <p class="mb-4">En Calafate Austral puedes pagar de forma segura a través de <b>Getnet de Santander Chile</b>, que acepta tarjetas de crédito y débito nacionales e internacionales.</p>
    <ul class="list-disc pl-6 mb-4">
      <li>Tarjetas de crédito y débito (Visa, Mastercard, American Express, etc.)</li>
      <li>Pagos en cuotas según condiciones de tu banco</li>
      <li>Transacciones protegidas y seguras</li>
    </ul>
    <p>Tu información está protegida y nunca almacenamos los datos de tu tarjeta.</p>
  </section>
  <Footer />
</template>

<script setup lang="ts">
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
</script> 