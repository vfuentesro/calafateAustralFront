<template>
  <Header />
  <section class="container mx-auto">
    <div class="relative mb-8">
      <img src="/calafate_imagen_nosotros.jpeg" alt="Imagen cabecera" class="w-full h-64 object-cover" />
      <div style="position:absolute;inset:0;background:black;opacity:0.5;" />
      <div class="absolute inset-0 flex flex-col justify-center items-center text-white text-center z-10">
        <h1 class="text-4xl font-bold mb-2">Nosotros</h1>
        <p class="text-white"><a href="/">Home</a> &gt; Nosotros</p>
      </div>
    </div>
    <div class="max-w-2xl mx-auto text-black px-2 sm:px-4 md:px-0">
      <h2 class="text-xl md:text-2xl font-bold mb-4">En Calafate Austral</h2>
      <p class="mb-4 text-base md:text-lg">Tejemos la esencia de Pomaire en cada hebra, somos artesanos y apasionados de lo hecho a mano, dedicados a preservar las técnicas ancestrales chilenas y a reinterpretarlas para la vida contemporánea.</p>
      <p class="mb-4 text-base md:text-lg">Nuestros ponchos, sombreros, boinas y mochilas no son simples accesorios: son piezas con alma, creadas para perdurar y contar historias. Cada producto nace de materiales nobles —lana virgen, algodón crudo y tintes orgánicos—, trabajados con el mismo esmero con el que nuestras abuelas nos enseñaron a crear.</p>
      <h3 class="text-lg md:text-xl font-semibold mb-2">Lo que nos define:</h3>
      <ul class="list-disc pl-6 mb-4 text-base md:text-lg">
        <li><strong>Tradición viva:</strong> Diseños que honran el folclore local, con una mirada moderna.</li>
        <li><strong>Hecho para durar:</strong> Calidad artesanal que resiste el paso del tiempo.</li>
        <li><strong>Comercio justo:</strong> Colaboramos directamente con maestros artesanos de Pomaire.</li>
      </ul>
      <p class="italic mb-4 text-base md:text-lg">"Más que una tienda, somos un puente entre la sabiduría ancestral y tu día a día."</p>
      <h4 class="text-base md:text-lg font-semibold mb-2">¿Por qué elegirnos?</h4>
      <p class="mb-20 text-base md:text-lg">Porque en Calafate Austral no compras un producto: adoptas una historia, una herencia viva, un pedazo auténtico de la cultura chilena.</p>
    </div>
  </section>
  <Footer />
</template>

<script setup lang="ts">
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
</script>
