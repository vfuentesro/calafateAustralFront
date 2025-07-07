<template>
  <Header />
  <div class="max-w-3xl mx-auto py-10 px-4">
    <h1 class="text-2xl font-bold mb-6">Carrito de compras</h1>
    <div v-if="cart.items.length === 0" class="text-gray-500 text-center py-16">
      Tu carrito está vacío.
    </div>
    <div v-else>
      <div v-for="item in cart.items" :key="item.product.id_producto" class="flex items-center gap-4 mb-6 border-b pb-4">
        <img :src="item.product.imagen" alt="" class="w-20 h-20 rounded object-cover border" />
        <div class="flex-1">
          <div class="font-semibold text-lg">{{ item.product.nombre_p }}</div>
          <div class="text-gray-500">Precio: ${{ item.product.precio_p.toLocaleString() }}</div>
          <div class="flex items-center gap-2 mt-2">
            <button @click="updateQty(item, item.quantity - 1)" :disabled="item.quantity <= 1" class="px-2 py-1 bg-gray-200 rounded">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="updateQty(item, item.quantity + 1)" class="px-2 py-1 bg-gray-200 rounded">+</button>
          </div>
        </div>
        <div class="font-semibold">${{ (item.product.precio_p * item.quantity).toLocaleString() }}</div>
        <button @click="remove(item.product.id_producto)" class="text-red-500 hover:text-red-700 ml-2">Eliminar</button>
      </div>
      <div class="flex justify-between items-center mt-8 border-t pt-6">
        <div>
          <button @click="cart.clearCart()" class="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded transition">Vaciar carrito</button>
        </div>
        <div class="text-xl font-bold">Subtotal: ${{ cart.totalAmount.toLocaleString() }}</div>
      </div>
      <div class="flex justify-end mt-6">
        <button @click="goToCheckout" class="bg-black hover:bg-gray-800 text-white font-semibold py-3 px-8 rounded transition text-lg">Pagar ahora</button>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup lang="ts">
import { useCartStore } from '../stores/cart.store'
import { useRouter } from 'vue-router'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import { useToast } from 'vue-toastification'
import { h } from 'vue'
import { Icon } from '@iconify/vue'

const cart = useCartStore()
const router = useRouter()
const toast = useToast()

function updateQty(item: { product: any, quantity: number }, qty: number): void {
  if (qty > 0) {
    cart.updateQuantity(item.product.id_producto, qty)
    toast.success('Cantidad actualizada', {
      icon: h(Icon, { icon: 'mdi:check-circle', style: 'color:#22c55e; fontSize:1.5em; marginRight:"0.5em";' }),
      timeout: 2000,
      toastClassName: 'bg-green-600 text-white',
      bodyClassName: 'flex items-center',
    })
  }
}

function remove(id: number): void {
  cart.removeItem(id)
  toast.error('Producto eliminado del carrito', {
    icon: h(Icon, { icon: 'mdi:close-circle', style: 'color:#dc2626; fontSize:1.5em; marginRight:"0.5em";' }),
    timeout: 2500,
    closeOnClick: true,
    hideProgressBar: false,
    toastClassName: 'bg-red-600 text-white',
    bodyClassName: 'flex items-center',
  })
}

function goToCheckout() {
  router.push('/checkout')
}
</script> 