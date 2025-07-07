<template>
  <div class="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
      <button @click="$emit('close')" class="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl">&times;</button>
      <h2 class="text-xl font-bold mb-4">Carrito de compras</h2>
      <div v-if="cart.items.length === 0" class="text-gray-500 text-center py-8">
        El carrito está vacío
      </div>
      <div v-else>
        <div v-for="item in cart.items" :key="item.product.id_producto" class="flex items-center gap-3 mb-4">
          <img :src="item.product.imagen" alt="" class="w-14 h-14 rounded object-cover border" />
          <div class="flex-1">
            <div class="font-medium">{{ item.product.nombre_p }}</div>
            <div class="flex items-center gap-2 mt-1">
              <button @click="updateQty(item, item.quantity - 1)" :disabled="item.quantity <= 1" class="px-2 py-1 bg-gray-200 rounded">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="updateQty(item, item.quantity + 1)" class="px-2 py-1 bg-gray-200 rounded">+</button>
            </div>
          </div>
          <div class="font-semibold">${{ (item.product.precio_p * item.quantity).toLocaleString() }}</div>
          <button @click="remove(item.product.id_producto)" class="text-red-500 hover:text-red-700 ml-2">Eliminar</button>
        </div>
        <div class="border-t pt-4 mt-4 flex flex-col gap-2">
          <div class="flex justify-between font-semibold">
            <span>Total:</span>
            <span>${{ cart.totalAmount.toLocaleString() }}</span>
          </div>
          <div class="flex gap-2 mt-2">
            <button @click="cart.clearCart()" class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded transition">Vaciar carrito</button>
            <button class="flex-1 bg-black hover:bg-gray-800 text-white py-2 rounded transition">Finalizar compra</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '../stores/cart.store'
const cart = useCartStore()

import type { CartItem } from '../stores/cart.store'
import { useToast } from 'vue-toastification'

const toast = useToast()

function updateQty(item: CartItem, qty: number) {
  if (qty > 0) {
    cart.updateQuantity(item.product.id_producto, qty)
    toast.info('Cantidad actualizada')
  }
}
function remove(id: number) {
  cart.removeItem(id)
  toast.success('Producto eliminado del carrito')
}
</script> 