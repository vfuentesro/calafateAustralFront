<template>
  <section class="py-8 sm:py-12 bg-orange-50">
    <div class="max-w-6xl mx-auto relative px-4 sm:px-6" :style="`min-height: ${isMobile ? 'auto' : '320px'};`">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <!-- Texto izquierdo -->
        <div class="px-6 sm:px-8 md:px-10 py-8 sm:py-12 md:py-17.5 relative z-10 bg-white md:mr-[-1px]">
          <h3 class="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
            Productos con historia,<br />tejidos con tradición
          </h3>
          <p class="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
            Lleva contigo un pedacito de Chile, hecho por manos maestras.
          </p>
          <RouterLink to="/products" class="inline-block">
            <button class="bg-[#b99049] text-white px-4 py-2 sm:px-5 sm:py-3 rounded hover:bg-yellow-700 transition text-sm sm:text-base">
              Ver más piezas únicas
            </button>
          </RouterLink>
        </div>
        <div class="hidden md:block"></div>
      </div>

      <!-- Carrusel desktop -->
      <div 
        class="md:absolute top-0 mt-6 md:mt-0 relative md:left-1/2 w-full md:w-[calc(50%+16px)] h-[240px] sm:h-[280px] md:h-full overflow-hidden z-0"
        v-if="!isMobile"
      >
        <div class="relative w-full h-full">
          <button
            class="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-1 sm:p-2 rounded-full shadow hover:bg-opacity-100"
            @click="prevSlide"
          >◀</button>

          <button
            class="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-1 sm:p-2 rounded-full shadow hover:bg-opacity-100"
            @click="nextSlide"
          >▶</button>

          <div class="flex transition-transform duration-500 ease-in-out h-full"
            :style="{ transform: `translateX(-${currentIndex * (slideWidth + slideGap)}px)` }"
          >
            <div
              v-for="(slide, index) in props.slides"
              :key="index"
              class="flex-shrink-0 rounded-lg overflow-hidden bg-gray-200"
              :style="{ width: `${isMobile ? mobileSlideWidth : slideWidth}px`, height: `${isMobile ? mobileSlideHeight : slideHeight}px`, marginRight: index < props.slides.length - 1 ? `${slideGap}px` : '0' }"
            >
              <img
                v-if="slide.img"
                :src="slide.img"
                :alt="slide.alt || `Imagen ${index + 1}`"
                class="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Carrusel móvil -->
      <div class="relative w-full h-[200px] mt-8 overflow-hidden md:hidden">
        <div class="relative w-full h-full">
          <button
        class="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-transparent text-white p-1 rounded-full shadow border-white border-[1px] hover:bg-white hover:bg-opacity-20 transition"
        style="backdrop-filter: blur(2px);"
        @click="prevSlide"
          >◀</button>

          <button
        class="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-transparent text-white p-1 rounded-full shadow border-white border-[1px] hover:bg-white hover:bg-opacity-20 transition"
        style="backdrop-filter: blur(2px);"
        @click="nextSlide"
          >▶</button>

          <div class="flex transition-transform duration-500 ease-in-out h-full"
        :style="{ transform: `translateX(-${currentIndex * (mobileSlideWidth + slideGap)}px)` }">
        <div
          v-for="(slide, index) in props.slides"
          :key="'mobile-' + index"
          class="flex-shrink-0 rounded-lg bg-[#5C4033] mx-1 overflow-hidden"
          :style="{ width: `${mobileSlideWidth}px`, height: `${mobileSlideHeight}px` }"
        >
          <img
            v-if="slide.img"
            :src="slide.img"
            :alt="slide.alt || `Imagen ${index + 1}`"
            class="w-full h-full object-cover"
          />
        </div>
          </div>
        </div>
      </div>

      <!-- Indicadores -->
      <div class="pt-4 mt-14 flex justify-center gap-2 w-full">
        <span
          v-for="(_, index) in visibleDots"
          :key="index"
          class="h-2 w-2 rounded-full cursor-pointer"
          :class="currentIndex === index ? 'bg-yellow-600' : 'bg-gray-300'"
          @click="goToSlide(index)"
        ></span>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

interface Slide {
  img: string;
  alt?: string;
}

const props = defineProps<{
  slides: Slide[];
}>();

const slideWidth = 256;
const slideHeight = 320;
const mobileSlideWidth = 180;
const mobileSlideHeight = 200;
const slideGap = 16;

const currentIndex = ref(0);
let timer: ReturnType<typeof setInterval> | null = null;
let isPaused = false;

const isMobile = ref(window.innerWidth < 768);
const handleResize = () => {
  isMobile.value = window.innerWidth < 768;
};

const visibleDots = computed(() => props.slides.length - 1);

const startTimer = () => {
  timer = setInterval(() => {
    if (!isPaused) nextSlide();
  }, 3000);
};

const resetTimerWithDelay = () => {
  isPaused = true;
  if (timer) clearInterval(timer);
  setTimeout(() => {
    isPaused = false;
    startTimer();
  }, 5000);
};

const nextSlide = () => {
  if (currentIndex.value >= props.slides.length - 2) {
    currentIndex.value = 0;
  } else {
    currentIndex.value += 1;
  }
  resetTimerWithDelay();
};

const prevSlide = () => {
  if (currentIndex.value <= 0) {
    currentIndex.value = props.slides.length - 2;
  } else {
    currentIndex.value -= 1;
  }
  resetTimerWithDelay();
};

const goToSlide = (index: number) => {
  currentIndex.value = index;
  resetTimerWithDelay();
};

onMounted(() => {
  startTimer();
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  if (timer) clearInterval(timer);
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.slider::-webkit-scrollbar {
  display: none;
}
</style>
