<template>
  <div
    class="relative bg-white rounded-lg overflow-hidden shadow transition hover:shadow-md hover:-translate-y-1 flex flex-col justify-between group min-h-[400px] md:min-h-[440px] h-full"
    @mouseenter="emitHover(true)"
    @mouseleave="emitHover(false)"
  >
    <!-- Imagen -->
    <div class="h-48 md:h-56 relative">
      <img :src="product.imagen" :alt="product.nombre_p" class="object-cover w-full h-56" />
      <!-- Etiqueta NUEVO o % -->
      <span
        v-if="showDiscountBadge"
        class="absolute top-3 right-3 text-xs px-2 py-0.5 rounded-full font-semibold"
        :class="badgeClass"
      >
        {{ badgeText }}
      </span>
      <!-- Overlay con transición -->
      <transition name="fade-slide">
        <div
          v-if="hovered"
          class="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-white z-10"
        >
          <button
            @click.stop="props.onAddToCart ? props.onAddToCart(props.product, 1) : addToCart(1)"
            class="bg-white text-yellow-600 font-semibold px-4 py-2 rounded mb-4 transform transition active:scale-95 hover:scale-110"
          >
            Añadir al carrito
          </button>
          <div class="flex gap-6 text-sm">
            <button
              @mouseenter="isHoveringShare = true"
              @mouseleave="isHoveringShare = false"
              @click.stop="handleShare"
              class="flex items-center space-x-1 transition active:scale-95"
              :class="isHoveringShare ? 'text-amber-500' : 'text-white'"
            >
              <Icon icon="mdi:share-variant" class="w-4 h-4 transition-colors duration-200" />
              <span>Compartir</span>
            </button>
            <button
              @mouseenter="isHoveringAdd = true"
              @mouseleave="isHoveringAdd = false"
              @click.stop="handleAddToWishlist"
              class="flex items-center space-x-1 transition active:scale-95"
              :class="isHoveringAdd ? 'text-amber-500' : 'text-white'"
            >
              <Icon icon="mdi:heart-outline" class="w-4 h-4 transition-colors duration-200" />
              <span>Añadir</span>
            </button>
          </div>
        </div>
      </transition>
    </div>
    <!-- Contenido del producto -->
    <div class="flex flex-col justify-between h-full px-5 py-8 md:p-5 grow cursor-pointer md:text-left mt-3" @click="handleGoToProduct">
      <div>
        <h4 class="text-base md:text-lg font-semibold line-clamp-1 mb-1">{{ product.nombre_p }}</h4>
        <p class="text-sm md:text-base text-gray-500 line-clamp-2 mb-2">{{ product.descripcion_p || 'Llévate el campo en cada paso' }}</p>
      </div>
      <div class="mt-4 pt-2 border-t border-gray-100 flex items-center md:justify-start">
        <span class="font-bold text-[#5C4033] text-lg md:text-xl">
          {{ priceText }}
        </span>
        <span v-if="showDiscount" class="line-through text-gray-400 text-sm md:text-base ml-2">
          {{ originalPriceText }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useCartStore } from '../../stores/cart.store'
import { useToast } from 'vue-toastification'

const props = defineProps<{
  product: any,
  hovered?: boolean,
  showDiscount?: boolean,
  showDiscountBadge?: boolean,
  onShare?: (product: any) => void,
  onAddToWishlist?: (product: any) => void,
  onGoToProduct?: (id: number) => void,
  onAddToCart?: (product: any, quantity: number) => void
}>()

const emit = defineEmits(['hover'])

const hovered = ref(false)
const isHoveringShare = ref(false)
const isHoveringAdd = ref(false)

const cart = useCartStore()
const toast = useToast()

function emitHover(val: boolean) {
  hovered.value = val
  emit('hover', val)
}

function addToCart(quantity = 1) {
  cart.addItem(props.product, quantity)
  toast.success(`Producto añadido al carrito`)
}

function handleShare() {
  if (props.onShare) props.onShare(props.product)
  toast.info('Enlace para compartir generado')
}
function handleAddToWishlist() {
  if (props.onAddToWishlist) props.onAddToWishlist(props.product)
  toast.success('Producto añadido a la lista de deseos')
}
function handleGoToProduct() {
  if (props.onGoToProduct) props.onGoToProduct(props.product.id_producto)
}

const discount = computed(() => {
  // Si id_oferta es objeto y tiene descuento
  if (props.product.id_oferta && typeof props.product.id_oferta === 'object' && props.product.id_oferta.descuento) {
    return Number(props.product.id_oferta.descuento)
  }
  return 0
})
const showDiscount = computed(() => {
  return discount.value > 0
})
const showDiscountBadge = computed(() => {
  return showDiscount.value
})
const badgeText = computed(() => {
  if (showDiscount.value) {
    return `-${Math.round(discount.value)}%`
  }
  return ''
})
const badgeClass = computed(() => {
  if (showDiscount.value) {
    return 'bg-red-200 text-red-700'
  }
  return ''
})
const priceText = computed(() => {
  if (discount.value > 0) {
    const discounted = props.product.precio_p - (props.product.precio_p * discount.value) / 100
    return discounted.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 })
  }
  return (props.product.precio_p).toLocaleString('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 })
})
const originalPriceText = computed(() => {
  if (discount.value > 0) {
    return (props.product.precio_p).toLocaleString('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 })
  }
  return ''
})
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all .25s ease-in-out;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(0px);
}
.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style> 