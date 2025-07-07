<template>
  <section class="relative w-full h-[30vh] sm:h-[40vh] md:h-[55vh] lg:h-[70vh] overflow-hidden">
    <!-- Carrusel de imágenes -->
    <div class="absolute inset-0 w-full h-full">
      <transition name="fade" mode="out-in">
        <img
          :key="currentIndex"
          :src="images[currentIndex]"
          class="absolute inset-0 w-full h-full object-cover sm:rounded-none"
          alt="Imagen del carrusel"
        />
      </transition>
    </div>

    <!-- Texto alineado arriba a la derecha -->
    <div class=" relative top-1/4 left-1/2 transform -translate-x-1/2 z-20 text-center px-4 w-full">
      <h1 class="text-white text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-7xl font-bold drop-shadow-xl leading-tight">
        ¡TODO LO QUE NECESITAS ESTÁ AQUÍ!
      </h1>
    </div>

    <!-- Panel inferior derecho -->
    <div
      class="absolute z-10 bg-black/60 text-white p-10 sm:p-5 md:p-6 rounded-lg shadow-lg transition-all"
      :class="{
        'bottom-4 right-4 max-w-xs sm:max-w-sm md:max-w-md': !isMobile,
        'bottom-4 left-1/2 -translate-x-1/2 text-center w-[90%] max-w-full': isMobile,
      }"
    >
      <h2 class="text-xs sm:text-base md:text-lg lg:text-xl font-semibold mb-2">
        ¡Compra los mejores ponchos, sombreros, boinas y más!
      </h2>
      <div>
        <button class="mt-2 sm:mt-4 bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded shadow">
          <RouterLink to="/products">
            COMPRAR AHORA
          </RouterLink>
        </button>
      </div>
      
    </div>

    <!-- Sombra para legibilidad -->
    <div class="absolute inset-0 bg-black/30 z-0"></div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const images = [
  '/img/hero1.svg',
  '/img/hero2.svg',
  '/img/hero3.svg',
]

const currentIndex = ref(0)
const isMobile = ref(false)

const updateIsMobile = () => {
  isMobile.value = window.innerWidth < 640
}

let intervalId: number

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % images.length
}

onMounted(() => {
  intervalId = window.setInterval(nextSlide, 5000)
  updateIsMobile()
  window.addEventListener('resize', updateIsMobile)
})

onUnmounted(() => {
  clearInterval(intervalId)
  window.removeEventListener('resize', updateIsMobile)
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease-in;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
