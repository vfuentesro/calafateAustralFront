<template>
  <div>
    <Header />
    <div v-if="productoSeleccionado">
      <Product :product="productoSeleccionado" />
    </div>
    <div v-else class="text-center p-10 text-gray-500">
      Producto no encontrado.
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useProductStore } from '../stores/products'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Product from '../components/products/Product.vue'
import { computed, onMounted } from 'vue'

const route = useRoute()
const productStore = useProductStore()

const productoSeleccionado = computed(() => {
  const id = Number(route.params.id)
  return productStore.products.find(p => p.id_producto === id)
})

onMounted(() => {
  if (!productStore.products.length) {
    productStore.fetchProducts()
  }
})
</script>