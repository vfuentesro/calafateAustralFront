<template>
  <section class="py-5 md:py-10 bg-gray-100 px-4 sm:px-6 lg:px-8">
    <h3 class="text-2xl md:text-4xl font-bold text-center mb-6 md:mb-10">Ofertas destacadas</h3>
    <!-- Carrusel tipo slides -->
    <div class="mb-10">
      <Carousel ref="carouselRef" :wrap-around="true" :autoplay="3000" :pause-autoplay-on-hover="true" class="rounded-lg shadow-lg" :breakpoints="carouselBreakpoints">
        <template #default>
          <Slide v-for="offer in offers" :key="offer.id" class="w-full h-full px-2 xl:px-3">
            <ProductCard
              :product="offer"
              class="w-full h-full"
              :onAddToCart="(product, quantity = 1) => handleAddToCart(product, quantity)"
              :onShare="handleShare"
              :onAddToWishlist="handleAddToWishlist"
              :onGoToProduct="goToProduct"
            />
          </Slide>
        </template>
      </Carousel>
    </div>
    <div class="flex flex-col items-center mt-4 gap-2">
      <div class="flex justify-center w-full">
        <!-- <Navigation /> eliminado para quitar flechas laterales -->
      </div>
      <div class="flex justify-center w-full">
        <Pagination />
      </div>
    </div>
    
  </section>
</template>

<script lang="ts" setup>
import { useCartStore } from '../../stores/cart.store'
import { useWishlistStore } from '../../stores/products'
import { useProductStore } from '../../stores/products'
import { useRouter } from 'vue-router'
import { ref, computed, onMounted } from 'vue'
import { Carousel, Slide, Pagination } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import ProductCard from '../products/ProductCard.vue'

const cart = useCartStore()
const wishlist = useWishlistStore()
const productStore = useProductStore()
const router = useRouter()

onMounted(async () => {
  await productStore.fetchProducts()
})

const offers = computed(() => productStore.products.filter(p => p.discount > 0))

function handleAddToCart(offer: any, quantity = 1) {
  cart.addItem(offer, quantity)
  alert('Producto añadido al carrito')
}

function handleShare(offer: any) {
  const url = window.location.origin + '/products/' + (offer.id ?? offer.title)
  if (navigator.share) {
    navigator.share({
      title: offer.title,
      text: offer.subtitle,
      url
    })
  } else {
    navigator.clipboard.writeText(url)
    alert('Enlace copiado al portapapeles')
  }
}

function handleAddToWishlist(offer: any) {
  wishlist.addToWishlist({
    id: offer.id ?? offer.title,
    name: offer.title,
    price: offer.price,
    image: offer.image
  })
  alert('Producto añadido a deseados')
}

function goToProduct(id: number) {
  router.push({ name: 'SingleProduct', params: { id } })
}

const carouselRef = ref<any>(null)

const carouselBreakpoints = {
  0: { itemsToShow: 1 },
  640: { itemsToShow: 2 },
  1024: { itemsToShow: 4 },
  1280: { itemsToShow: 5 }
}
</script>