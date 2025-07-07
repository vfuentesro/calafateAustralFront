<template>
  <Header />
  <section class="container mx-auto">
    <!-- Banner igual que Products -->
    <section class="relative w-full h-60 mb-8">
      <img src="/calafate_imagen_nosotros.jpeg" alt="Imagen cabecera" class="w-full h-64 object-cover" />
      <div style="position:absolute;inset:0;background:black;opacity:0.5;height:107%;"></div>
      <div class="absolute inset-0 flex flex-col justify-center text-white text-center z-10">
        <h1 class="text-4xl font-bold">Contacto</h1>
        <p class="mt-2 text-sm"><router-link to="/">Inicio</router-link> &gt; Contacto</p>
      </div>
    </section>
    <div class="text-center mb-20 mt-15">
      <h2 class="text-3xl font-bold mb-4">¡Contáctanos!</h2>
      <p class="max-w-xl mx-auto text-lg mb-10">
        Para más información sobre nuestros productos y servicios. Siéntete libre de enviar un correo.
        ¡Nuestro personal siempre estará para atenderte!
      </p>
    
      <div class="flex flex-col md:flex-row gap-8 justify-center items-center w-full">
        <!-- Información de contacto -->
        <div class="w-full md:w-1/2 md:max-w-md bg-white p-6 rounded-lg shadow-md border-t border-b border-gray-200 text-left mb-8 md:mb-0">
          <div class="mb-4">
            <div class="flex items-center gap-2 mb-1">
              <Icon icon="mdi:map-marker" class="w-5 h-5 text-amber-600" />
              <strong>Dirección:</strong>
            </div>
            <div class="mb-2">
              <span class="block"><strong>Tienda Pomaire:</strong></span>
              <span class="block pl-4">Roberto Bravo 77, B, Pomaire, Melipilla, Región Metropolitana, Chile.</span>
            </div>
            <div>
              <span class="block"><strong>Tienda Pucón:</strong></span>
              <span class="block pl-4">Av. Bernardo O'Higgins 774, local 19, 4920000 Pucon, Pucón, Araucanía</span>
            </div>
          </div>
          <div class="mb-4">
            <div class="flex items-center gap-2 mb-1">
              <Icon icon="mdi:phone" class="w-5 h-5 text-amber-600" />
              <strong>Teléfono:</strong>
            </div>
            <span>Móvil: +56 9 3657 2068</span>
          </div>
          <div>
            <div class="flex items-center gap-2 mb-1">
              <Icon icon="mdi:clock-outline" class="w-5 h-5 text-amber-600" />
              <strong>Horario:</strong>
            </div>
            <div class="mb-2">
              <span class="block font-bold">Tienda Pomaire:</span>
              <span class="block pl-4">Lunes a Viernes: 10:00 - 17:30</span>
              <span class="block pl-4">Sábado y Domingo: 10:00 - 18:30</span>
            </div>
            <div>
              <span class="block font-bold">Tienda Pucón:</span>
              <span class="block pl-4">Lunes a Sábado: 11:00 - 18:00</span>
              <span class="block pl-4">Domingo: Cerrado</span>
            </div>
          </div>
        </div>
        <!-- Formulario de contacto -->
        <div class="w-full md:w-1/2 md:max-w-md bg-white p-6 rounded-lg shadow-md border-t border-b border-gray-200">
          <form @submit.prevent="handleSubmit" class="flex flex-col space-y-4">
            <div>
              <label for="nombre" class="font-bold mb-1">Tu nombre</label>
              <input v-model="form.nombre" type="text" id="nombre" name="nombre" placeholder="Nombre de ejemplo" required class="w-full p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label for="correo" class="font-bold mb-1">Correo electrónico</label>
              <input v-model="form.correo" type="email" id="correo" name="correo" placeholder="calafateaustral@gmail.com" required class="w-full p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label for="asunto" class="font-bold mb-1">Asunto</label>
              <input v-model="form.asunto" type="text" id="asunto" name="asunto" placeholder="Escribe sobre qué quieres hablar" required class="w-full p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label for="mensaje" class="font-bold mb-1">Mensaje</label>
              <textarea v-model="form.mensaje" id="mensaje" name="mensaje" placeholder="¡Hola! Quisiera hablar sobre..." required class="w-full p-2 border border-gray-300 rounded h-32 resize-vertical"></textarea>
            </div>
            <button type="submit" class="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 rounded w-full">Enviar</button>
          </form>
        </div>
      </div>
    </div>
  </section>
  <Footer />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import { ContactService } from '../services/api.service'

const form = ref({
  nombre: '',
  correo: '',
  asunto: '',
  mensaje: ''
})

async function handleSubmit() {
  try {
    await ContactService.send(form.value)
    alert(`¡Gracias, ${form.value.nombre}! Tu mensaje ha sido enviado.`)
    form.value = { nombre: '', correo: '', asunto: '', mensaje: '' }
  } catch (e) {
    alert('Hubo un error al enviar el mensaje. Intenta de nuevo.')
  }
}
</script>


