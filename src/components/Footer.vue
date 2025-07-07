<template>
    <footer class="bg-black text-gray-300 pt-12 pb-6">
        <div class="container mx-auto px-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                <div>
                    <a href="/" class="flex items-center mx-auto md:mx-0 md:mr-8 lg:mr-10 pl-4">
                    <img 
                        src="/img/logo.png" 
                        alt="Calafate Austral" 
                        class="h-35 w-screen md:w-auto md:h-24 text-center md:text-left"
                    >
                    </a>
                    
                    <div class="flex space-x-2 md:pl-7 justify-center md:justify-start">
                        <a v-for="(social,index) in socialLinks"
                        :href="social.url"
                        :key="index"
                        class="text-gray-400 hover:text-amber-400 transition"
                        target="_blank" rel="noopener noreferrer">
                            <Icon :icon="social.icon" class="w-5 h-5 text-white"/>
                        </a>
                    </div>
                </div>

                <!-- Quick Links -->
                <div class="flex flex-col items-center md:items-start">
                    <h3 class="text-lg font-semibold text-white mb-4">Enlaces</h3>
                    <ul class="space-y-2 text-center md:text-left">
                        <li v-for="(link,index) in quickLinks" :key="index">
                            <router-link :to="'/' + link.hash" class="hover:text-amber-400 transition">{{ link.name }}</router-link>
                        </li>
                    </ul>
                </div>

                <!-- Customer Service -->
                <div class="flex flex-col items-center md:items-start">
                    <h3 class="text-lg font-semibold text-white mb-4">Ayuda</h3>
                    <ul class="space-y-2 text-center md:text-left">
                        <li>
                            <router-link to="/payment-methods" class="hover:text-amber-400 transition">Métodos de pago</router-link>
                        </li>
                        <li>
                            <router-link to="/returns-policy" class="hover:text-amber-400 transition">Devoluciones</router-link>
                        </li>
                        <li>
                            <router-link to="/shipping-info" class="hover:text-amber-400 transition">Envíos</router-link>
                        </li>
                    </ul>
                </div>

                <!-- Newsletter -->
                <div class="flex flex-col items-center md:items-start">
                    <h3 class="text-lg font-semibold text-white mb-3">Noticias</h3>
                    <p class="mb-3 text-center md:text-left">¡Suscríbete para recibir noticias de nuestros productos y ofertas especiales!</p>
                    <form class="flex pr-0 md:pr-10 w-full">
                        <input type="email" placeholder="Correo Electrónico"
                        class="bg-white px-4 py-2 w-full focus:outline-none text-gray-900" required>
                        <button type="submit" class="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2
                        rounded-r transition">Suscribirme</button>
                    </form>
                    <div class="mt-4 flex items-center justify-center md:justify-start w-full">
                        <Icon icon="fa6-solid:envelope" class="w-5 h-5 mr-2" />
                        <span>calafateponchos.spa@gmail.com</span>
                    </div>
                </div>
            </div>

        <!-- Footer bottom -->
         <div class="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {{ new Date().getFullYear() }} Calafate austral. Todos los derechos reservados</p>
         </div>
         <div class="flex flex-wrap gap-4 justify-center mt-4 text-sm text-gray-500">
           <router-link to="/contacto" class="hover:underline">Contacto</router-link>
           <router-link to="/devoluciones" class="hover:underline">Política de Devoluciones</router-link>
           <router-link to="/privacidad" class="hover:underline">Política de Privacidad</router-link>
         </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { RouterLink } from 'vue-router';

// Modificado: ahora es array de objetos con name y hash
const quickLinks = [
    { name: 'Inicio', hash: '' },
    { name: 'Productos', hash: 'products' },
    { name: 'Ofertas', hash: 'offers' },
    { name: 'Nosotros', hash: 'about' },
    { name: 'Contacto', hash: 'contact' }
];

const socialLinks = [
    {icon:'fa6-brands:instagram', url:'https://tinyurl.com/bddbatju'},
    {icon:'fa6-brands:whatsapp', url:'https://wa.me/56936572068'},
];
</script>