<template>
  <section class="py-4 md:py-8 lg:py-12 text-center">
    <h3 class="text-2xl sm:text-3xl lg:text-4xl font-light mb-4 sm:mb-6 lg:mb-8 pt-6 sm:pt-8 lg:pt-12 px-4 sm:px-6">
      Comparte tu estilo con<br />
      <span class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-700 pt-1 sm:pt-2">
        #CalafateAustral
      </span>
    </h3>
    
    <div class="w-full">
      <img 
        :src="modaImage" 
        alt="Galería Instagram" 
        class="w-full" 
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import modaImage from '../../assets/moda.webp'
</script>