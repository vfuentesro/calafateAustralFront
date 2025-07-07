<template>
  <Header />
  <div class="max-w-3xl mx-auto py-10 px-4">
    <h1 class="text-2xl font-bold mb-6">Mi cuenta</h1>
    <div class="mb-8">
      <h2 class="text-lg font-semibold mb-2">Bienvenido, {{ userEdit.nombre_u || userEdit.correo_u }}</h2>
      <p class="text-gray-600">Correo: <span class="font-mono">{{ userEdit.correo_u }}</span></p>
      <div class="flex gap-2 mt-2">
        <input v-model="userEdit.nombre_u" class="border px-2 py-1 rounded" placeholder="Nombre" />
        <input v-model="userEdit.apellido_u" class="border px-2 py-1 rounded" placeholder="Apellido" />
        <button @click="guardarDatos" class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Guardar</button>
      </div>
      <router-link to="/cambiar-clave" class="text-blue-600 hover:underline text-sm mt-2 inline-block">Cambiar contraseña</router-link>
    </div>
    <div class="mb-10">
      <h2 class="text-lg font-semibold mb-4">Mis órdenes</h2>
      <div v-if="orders.length === 0" class="text-gray-500">No tienes órdenes registradas.</div>
      <div v-else>
        <table class="w-full text-left border">
          <thead>
            <tr class="bg-gray-100">
              <th class="py-2 px-3">#</th>
              <th class="py-2 px-3">Fecha</th>
              <th class="py-2 px-3">Total</th>
              <th class="py-2 px-3">Estado</th>
              <th class="py-2 px-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.id_venta" class="border-t">
              <td class="py-2 px-3">{{ order.id_venta }}</td>
              <td class="py-2 px-3">{{ formatDate(order.fecha_v) }}</td>
              <td class="py-2 px-3">${{ order.total_v.toLocaleString() }}</td>
              <td class="py-2 px-3">{{ order.estado_pago }}</td>
              <td class="py-2 px-3">
                <button class="text-blue-600 hover:underline" @click="verDetalle(order)">Ver detalle</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-if="detalleOrden" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div class="bg-white rounded shadow-lg p-6 max-w-lg w-full relative">
        <button class="absolute top-2 right-2 text-gray-500 hover:text-black" @click="detalleOrden = null">&times;</button>
        <h3 class="text-lg font-bold mb-2">Detalle de la orden #{{ detalleOrden.id_venta }}</h3>
        <p><b>Fecha:</b> {{ formatDate(detalleOrden.fecha_v) }}</p>
        <p><b>Total:</b> ${{ detalleOrden.total_v.toLocaleString() }}</p>
        <p><b>Estado:</b> {{ detalleOrden.estado_pago }}</p>
        <!-- Aquí podrías mostrar más detalles si el backend los expone -->
      </div>
    </div>
    <div class="flex gap-4 mt-8">
      <router-link to="/devoluciones" class="text-blue-600 hover:underline">Política de Devoluciones</router-link>
      <router-link to="/privacidad" class="text-blue-600 hover:underline">Política de Privacidad</router-link>
      <button @click="logout" class="text-red-600 hover:underline">Cerrar sesión</button>
    </div>
  </div>
  <Footer />
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import { useAuthStore } from '../stores/auth.store'
import apiClient from '../api/config'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const user = authStore.user
const userEdit = reactive({ ...user })
const orders = ref<any[]>([])
const router = useRouter()
const detalleOrden = ref<any|null>(null)

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString()
}

async function fetchOrders() {
  try {
    const res = await apiClient.get('/api/mis-ordenes/', { withCredentials: true })
    orders.value = res.data.ordenes || []
  } catch (e) {
    orders.value = []
  }
}

function verDetalle(order: any) {
  detalleOrden.value = order
}

function logout() {
  authStore.logout()
  router.push('/')
}

async function guardarDatos() {
  try {
    await apiClient.post('/api/actualizar-usuario/', userEdit, { withCredentials: true })
    authStore.checkAuth()
    alert('Datos actualizados')
  } catch (e) {
    alert('Error al actualizar los datos')
  }
}

onMounted(() => {
  fetchOrders()
})
</script> 