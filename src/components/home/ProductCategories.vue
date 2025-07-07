<template>
  <section class="py-16 md:py-28 text-center px-4">
    <h2 class="text-gray-500 text-2xl mb-2">¿Buscas algo especial?</h2>
    <h3 class="text-4xl font-bold mb-6 md:mb-8">Descubre nuestros productos</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 max-w-6xl mx-auto">
        <RouterLink
          v-for="category in categories"
          :key="category.title"
          :to="'/products'"
          class="w-full group"
        >
          <div
            class="w-full h-60 md:h-96 rounded-lg flex items-end justify-center
            p-4 cursor-pointer hover:opacity-90 transition bg-cover
            bg-center transform-gpu group-hover:scale-105 duration-300"
            :style="{ backgroundImage: `url(${category.image})` }"
          >
            <span class="text-white font-sans text-2xl bg-black/50 w-auto h-auto px-6 py-4 rounded">
              {{ category.title }}
            </span>
          </div>
        </RouterLink>
      </div>
  </section>
</template>

<script setup lang="ts">
const categories = [
  { title: 'Ponchos', image: '/img/ponchos.webp' },
  { title: 'Sombreros', image: '/img/sombreros.webp' },
  { title: 'Accesorios', image: '/img/accesorios.webp' },
];
</script>