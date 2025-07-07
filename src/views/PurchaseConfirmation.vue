<template>
  <Header />
  <div class="max-w-2xl mx-auto py-16 px-4 text-center">
    <h1 class="text-3xl font-bold mb-6 text-green-600">¡Compra realizada con éxito!</h1>
    <p class="text-lg mb-4">Gracias por tu compra. A continuación encontrarás el resumen de tu pedido.</p>
    <div v-if="loading" class="my-8">Cargando detalles de la orden...</div>
    <div v-else-if="error" class="my-8 text-red-600">{{ error }}</div>
    <div v-else-if="order" class="my-8 text-left bg-gray-50 rounded-lg p-6 shadow">
      <p class="mb-2"><span class="font-semibold">Número de orden:</span> {{ order.id_detalleventa }}</p>
      <p class="mb-2"><span class="font-semibold">Estado:</span> {{ order.estado || 'Procesando' }}</p>
      <p class="mb-2"><span class="font-semibold">Producto:</span> <span v-if="product">{{ product.nombre_p }}</span><span v-else>Cargando...</span></p>
      <p class="mb-2"><span class="font-semibold">Cantidad:</span> {{ order.cantidad_dv }}</p>
      <p class="mb-2"><span class="font-semibold">Precio unitario:</span> ${{ order.precio_unitario_dv.toLocaleString() }}</p>
      <p class="mb-2"><span class="font-semibold">Subtotal:</span> ${{ order.subtotal_dv.toLocaleString() }}</p>
      <p v-if="order.numero_seguimiento" class="mb-2"><span class="font-semibold">N° Seguimiento:</span> {{ order.numero_seguimiento }}</p>
    </div>
    <router-link to="/" class="inline-block mt-6 px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition font-semibold text-lg">
      Volver al inicio
    </router-link>
  </div>
  <Footer />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import { OrderService } from '../services/api.service'
import { ProductService } from '../services/api.service'

const route = useRoute()
const order = ref<any>(null)
const product = ref<any>(null)
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  const orderId = Number(route.query.order)
  if (!orderId) {
    error.value = 'No se encontró el número de orden.'
    loading.value = false
    return
  }
  try {
    order.value = await OrderService.getById(orderId)
    if (order.value && order.value.id_producto) {
      product.value = await ProductService.getById(order.value.id_producto)
    }
  } catch (e: any) {
    error.value = 'No se pudieron cargar los detalles de la orden.'
  } finally {
    loading.value = false
  }
})
</script> 