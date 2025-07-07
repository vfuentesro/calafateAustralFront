<template>
  <div>
    <!-- SECCIÓN PRINCIPAL DEL PRODUCTO -->
    <div class="p-6 max-w-6xl mx-auto">
      <!-- MIGAS DE PAN -->
      <nav class="text-sm text-gray-500 mb-4">
        <ol class="list-reset flex">
          <li><a href="#" class="hover:underline">Inicio</a> &gt;</li>
          <RouterLink to="/products"><li><a href="#" class="hover:underline px-1">Tienda</a> &gt;</li></RouterLink>
          <li class="font-bold px-1">{{ product.nombre_p }}</li>
        </ol>
      </nav>

      <!-- CONTENIDO PRINCIPAL DEL PRODUCTO -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- IMAGEN DEL PRODUCTO CON HOVER -->
        <div class="relative">
          <img 
            :src="currentImage" 
            :alt="product.nombre_p" 
            class="rounded-xl w-full transition-opacity duration-300 cursor-zoom-in"
            @mouseover="showSecondaryImage()"
            @mouseout="showPrimaryImage()"
            @click="openLightbox = true"
          />
          <!-- MINIATURAS -->
          <div class="flex gap-2 mt-3">
            <img 
              v-for="(image, index) in productImages" 
              :key="index"
              :src="image" 
              @click="changeImage(image)"
              @mouseover="changeImage(image)"
              class="w-16 h-16 object-cover rounded-md cursor-pointer border"
              :class="{'border-2 border-black': currentImage === image}"
            />
          </div>
        </div>

        <!-- INFORMACIÓN DEL PRODUCTO -->
        <div>
          <h1 class="text-3xl font-semibold mb-2">{{ product.nombre_p }}</h1>
            <div class="mb-2">
            <span class="text-gray-600 text-xl font-semibold">
              {{ new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 }).format(product.precio_p) }}
            </span>
            <template v-if="discount > 0">
              <span class="text-gray-400 text-lg line-through ml-2">
              {{ new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 }).format(product.precio_p) }}
              </span>
              <span class="ml-2 center text-red-600 font-bold padding-1 bg-red-100 rounded">
              -{{ Math.round(discount) }}%
              </span>
            </template>
            </div>

            <p class="text-gray-600 text-sm mb-4">
            {{ product.descripcion_p }}
            </p>

          <!-- SELECTOR DE CANTIDAD Y BOTÓN AÑADIR AL CARRITO -->
          <div class="flex items-center gap-4 mb-6 flex-wrap">
            <div class="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button 
                class="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-gray-400"
                @click="decrementQuantity"
              >
                <span class="text-lg font-medium">−</span>
              </button>
              
              <span class="px-4 py-2 bg-white text-center w-12 font-medium">
                {{ quantity }}
              </span>
              
              <button 
                class="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-gray-400"
                @click="incrementQuantity"
              >
                <span class="text-lg font-medium">+</span>
              </button>
            </div>

            <button 
              class="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 flex-grow md:flex-grow-0"
              @click="addToCart"
            >
              Añadir al carrito
            </button>
          </div>

          <!-- INFORMACIÓN ADICIONAL DEL PRODUCTO -->
          <ul class="text-sm text-gray-600 space-y-1 mb-6">
            <li><strong>SKU:</strong> {{ product.sku }}</li>
            <li><strong>Categoría:</strong> {{ product.id_categoria && typeof product.id_categoria === 'object' ? product.id_categoria.nombre_c : product.id_categoria }}</li>
          </ul>

          <!-- ICONOS DE REDES SOCIALES -->
          <div class="flex gap-4">
            <a href="#" class="text-gray-500 hover:text-black transition-colors"><i class="fab fa-linkedin"></i></a>
            <a href="#" class="text-gray-500 hover:text-black transition-colors"><i class="fab fa-instagram"></i></a>
            <a href="#" class="text-gray-500 hover:text-black transition-colors"><i class="fab fa-twitter"></i></a>
          </div>

          <div class="flex gap-4 mt-2">
            <button @click="handleShare" class="flex items-center gap-1 text-gray-600 hover:text-amber-500 transition-colors">
              <Icon icon="mdi:share-variant" class="w-5 h-5" /> Compartir
            </button>
            <button @click="handleAddToWishlist" class="flex items-center gap-1 text-gray-600 hover:text-amber-500 transition-colors">
              <Icon icon="mdi:heart-outline" class="w-5 h-5" /> Añadir a deseados
            </button>
          </div>
        </div>
      </div>

      <!-- SECCIÓN DE DESCRIPCIÓN DETALLADA -->
      <div class="mt-12">
        <div class="flex space-x-6 border-b mb-4">
          <button 
            class="pb-2 font-semibold"
            :class="{'border-b-2 border-black': activeTab === 'description'}"
            @click="setActiveTab('description')"
          >
            Descripción
          </button>
          <button 
            class="pb-2 font-semibold"
            :class="{'border-b-2 border-black': activeTab === 'additional'}"
            @click="setActiveTab('additional')"
          >
            Información adicional
          </button>
        </div>
        
        <!-- Contenido de Descripción -->
        <div v-if="activeTab === 'description'">
          <p class="text-sm text-gray-700">
            {{ product.descripcion_p }}
          </p>
        </div>
        
        <!-- Contenido de Información Adicional -->
        <div v-if="activeTab === 'additional'" class="text-sm text-gray-700">
          <ul class="space-y-2">
            <li><strong>Stock:</strong> {{ product.stock_p }}</li>
            <li><strong>Peso:</strong> {{ product.peso_kg }} kg</li>
            <li><strong>Dimensiones:</strong> {{ product.alto_cm }} x {{ product.ancho_cm }} x {{ product.largo_cm }} cm</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- LIGHTBOX PARA IMAGEN AMPLIADA -->
    <div v-if="openLightbox" class="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4" @click="openLightbox = false">
      <div class="relative max-w-4xl w-full">
        <button @click="openLightbox = false" class="absolute -top-12 right-0 text-white text-3xl hover:text-gray-300">&times;</button>
        <img :src="currentImage" alt="Vista ampliada" class="max-h-screen mx-auto">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useCartStore } from '../../stores/cart.store'
import { useWishlistStore } from '../../stores/products'
import { useToast } from 'vue-toastification'

const props = defineProps<{ product: any }>()

const cart = useCartStore()
const wishlist = useWishlistStore()
const toast = useToast()

// Usa props.product para mostrar los datos en el template
const productImages = ref([props.product.imagen])
const currentImage = ref(props.product.imagen)
const quantity = ref(1)
const activeTab = ref('description')
const openLightbox = ref(false)

watch(() => props.product.imagen, (newImg) => {
  productImages.value = [newImg]
  currentImage.value = newImg
})

function showSecondaryImage() {}
function showPrimaryImage() {
  currentImage.value = productImages.value[0]
}
function changeImage(img: string) {
  currentImage.value = img
}
function setActiveTab(tab: string) {
  activeTab.value = tab
}
function incrementQuantity() {
  quantity.value++
}
function decrementQuantity() {
  if (quantity.value > 1) quantity.value--
}
function addToCart() {
  cart.addItem(props.product, quantity.value)
  toast.success('Producto añadido al carrito')
}
function handleShare() {
  toast.info('Enlace para compartir generado')
}
function handleAddToWishlist() {
  wishlist.addToWishlist({
    id: props.product.id_producto,
    name: props.product.nombre_p,
    price: props.product.precio_p,
    image: props.product.imagen
  })
  toast.success('Producto añadido a la lista de deseos')
}
const discount = computed(() => {
  if (props.product.id_oferta && typeof props.product.id_oferta === 'object' && props.product.id_oferta.descuento) {
    return Number(props.product.id_oferta.descuento)
  }
  return 0
})
</script>

<style scoped>
/* Estilos para la transición de imágenes */
img {
  transition: opacity 0.3s ease;
}

/* Estilos para el lightbox */
.fixed {
  transition: all 0.3s ease;
}

/* Estilos para botones */
button {
  transition: all 0.2s ease;
}

/* Estilos para los botones de cantidad */
.flex.items-center.border.rounded-lg button {
  min-width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.flex.items-center.border.rounded-lg span {
  min-width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Efectos hover para botones de tamaño */
button.px-3.py-1.border.rounded-lg:hover {
  background-color: #f3f4f6;
  transform: translateY(-1px);
}

/* Efectos hover para botón añadir al carrito */
button.bg-black:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Estilos responsive para móviles */
@media (max-width: 640px) {
  .flex.items-center.gap-4.mb-6 {
    gap: 0.5rem;
  }
  
  button.bg-black {
    width: 100%;
    justify-content: center;
  }
  
  .flex.items-center.border.rounded-lg {
    width: 100%;
    justify-content: space-between;
  }
  
  /* Miniaturas en móvil */
  .flex.gap-2.mt-3 {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>