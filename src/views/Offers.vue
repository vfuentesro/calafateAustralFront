<template>
    <Header />
    <Offer :products="prod" />
    <Footer />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useProductStore } from '../stores/products'

const productStore = useProductStore()
const prod = ref<any[]>([])

onMounted(() => {
  prod.value = productStore.products.filter(p => p.discount > 0)
})
</script>
