<template>
        <Header />
        <Shop :products="prod"/>
        <Footer />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useProductStore } from '../stores/products'

const productStore = useProductStore()
const prod = ref<any[]>([])

onMounted(() => {
  prod.value = productStore.products
})
</script>