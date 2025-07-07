<template>
  <Header />
  <div class="max-w-2xl mx-auto py-10 px-4">
    <h1 class="text-2xl font-bold mb-6">Finalizar compra</h1>
    <div v-if="compraFinalizada" class="text-center py-16">
      <h2 class="text-2xl font-semibold mb-4 text-green-600">¡Gracias por tu compra!</h2>
      <p>Te hemos enviado un correo con los detalles de tu pedido.</p>
    </div>
    <div v-else>
      <div v-if="cart.items.length === 0" class="text-gray-500 text-center py-16">
        Tu carrito está vacío.
      </div>
      <div v-else>
        <div class="mb-8">
          <h2 class="text-lg font-semibold mb-2">Resumen del pedido</h2>
          <div v-if="authStore.isAuthenticated && authStore.user">
            <p class="mb-2 text-sm text-gray-600">Comprando como: <span class="font-semibold">{{ authStore.user.nombre_u || authStore.user.correo_u }}</span></p>
          </div>
          <ul>
            <li v-for="item in cart.items" :key="item.product.id_producto" class="flex justify-between items-center mb-2">
              <span>{{ item.product.nombre_p }} x{{ item.quantity }}</span>
              <span class="font-semibold">${{ (item.product.precio_p * item.quantity).toLocaleString() }}</span>
            </li>
          </ul>
          <div class="flex justify-between font-bold text-lg mt-4">
            <span>Total:</span>
            <span>${{ cart.totalAmount.toLocaleString() }}</span>
          </div>
        </div>
        <form @submit.prevent="finalizarCompra">
          <button type="submit" class="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 rounded transition text-lg mt-4 flex items-center justify-center gap-3 group" :disabled="loading">
            Pagar con
            <span class="flex items-center justify-center bg-black rounded transition-colors duration-200 group-hover:bg-gray-800" style="height:2.5rem;">
              <img src="/BANNER_GETNET_V1.png" alt="GetNet" class="h-8 w-auto transition duration-200 group-hover:scale-105 group-hover:drop-shadow-lg" style="background:transparent; max-width:120px;" />
            </span>
          </button>
          <div v-if="error" class="text-red-600 text-center mt-2">{{ error }}</div>
        </form>
      </div>
    </div>
  </div>
  <Footer />
  <Header v-if="authStore.showLoginModal" />
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useCartStore } from '../stores/cart.store'
import { useRouter } from 'vue-router'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import { useToast } from 'vue-toastification'
import apiClient from '../api/config'
import { useAuthStore } from '../stores/auth.store'

const cart = useCartStore()
const router = useRouter()
const toast = useToast()
const authStore = useAuthStore()

const compraFinalizada = ref(false)
const loading = ref(false)
const error = ref('')
const getnetMetodoId = ref<number|null>(null)

async function syncCartWithBackend() {
  const cartData: Record<string, number> = {};
  cart.items.forEach(item => {
    cartData[item.product.id_producto] = item.quantity;
  });
  console.log('POST a /api/sync-cart/', cartData);
  await apiClient.post('/api/sync-cart/', { cart: cartData }, { withCredentials: true });
  console.log('POST a /api/sync-cart/ completado');
}

onMounted(async () => {
  await authStore.checkAuth();
  if (!authStore.isAuthenticated) {
    toast.error('Debes iniciar sesión para finalizar la compra');
    authStore.openLoginModal();
    return;
  }
  cart.loadFromLocalStorage();
  if (cart.items.length === 0) {
    toast.info('Tu carrito está vacío')
    router.push('/')
    return
  }
  // Obtener el id del método GetNet desde el backend
  try {
    const res = await apiClient.get('/compra/metodo-pago-api/', { withCredentials: true })
    const metodos = res.data.metodos || res.data || []
    const getnet = metodos.find((m: any) => m.nombre.toLowerCase().includes('getnet'))
    if (getnet) {
      getnetMetodoId.value = getnet.id
    } else {
      error.value = 'No se encontró el método de pago GetNet'
    }
  } catch (e) {
    error.value = 'No se pudieron cargar los métodos de pago'
  }
})

watch(() => authStore.isAuthenticated, (nuevoValor) => {
  if (nuevoValor) {
    authStore.closeLoginModal();
    // Reintentar la lógica de carga de métodos de pago si el usuario acaba de loguearse
    cart.loadFromLocalStorage();
    // ... podrías recargar métodos de pago aquí si es necesario ...
  }
});

async function finalizarCompra() {
  error.value = ''
  if (!getnetMetodoId.value) {
    toast.error('No se encontró el método de pago GetNet')
    return
  }
  loading.value = true
  try {
    console.log('Sincronizando carrito con backend', cart.items);
    await syncCartWithBackend();
    console.log('Carrito sincronizado, iniciando pago...');
    // Guardar método de pago en la sesión
    const resMetodo = await apiClient.post('/compra/metodo-pago-api/', { metodo: getnetMetodoId.value }, {
      withCredentials: true,
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
    })
    if (!resMetodo.data.success) {
      throw new Error(resMetodo.data.error || 'Error al guardar el método de pago')
    }
    // Iniciar checkout con Getnet
    const response = await apiClient.post('/compra/getnet-checkout/', {}, {
      withCredentials: true,
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
    })
    if (response.data && response.data.payment_url) {
      window.location.href = response.data.payment_url
    } else if (response.data && response.data.checkout_url) {
      window.location.href = response.data.checkout_url
    } else if (response.data && response.data.url) {
      window.location.href = response.data.url
    } else {
      toast.error('No se pudo iniciar el pago con Getnet')
    }
  } catch (e: any) {
    error.value = e.response?.data?.error || 'Error al procesar el pago. Intenta nuevamente.'
  } finally {
    loading.value = false
  }
}
</script> 