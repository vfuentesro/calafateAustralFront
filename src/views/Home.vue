<template>
  <div class="home-page">
    <Header />
    <HeroSection class="bg-gray-200" />
    <ProductCategories />
    <OffersCarousel :offers="offers" />
    <CallToActionStrip :slides="slides" />
    <InstagramGallery />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from '../components/Header.vue'
import HeroSection from '../components/home/HeroSection.vue'
import ProductCategories from '../components/home/ProductCategories.vue'
import OffersCarousel from '../components/home/OffersCarousel.vue'
import CallToActionStrip from '../components/home/CallToActionStrip.vue'
import InstagramGallery from '../components/home/InstagramGallery.vue'
import Footer from '../components/Footer.vue'


const offers = [
  {
    title: 'Sombrero de Fieltro',
    subtitle: 'Llévate el campo en cada paso',
    price: 65000,
    originalPrice: 93000,
    image: './img/prodOffers/sombreroFieltro.webp',
    isNew: false,
    category: 'sombrero'
  },
  {
    title: 'Poncho arcoíris',
    subtitle: 'Calor hecho a mano',
    price: 120000,
    originalPrice: 145000, // Sin descuento
    image: './img/prodOffers/ponchoArco.webp',
    isNew: false,
    category: 'poncho'
  },
  {
    title: 'Boina',
    subtitle: 'Elegancia rústica en cada puntada',
    price: 55000,
    originalPrice: 110000,
    image: './img/prodOffers/boina.webp',
    isNew: false,
    category: 'sombrero'
  },
  {
    title: 'Mochila cuero',
    subtitle: 'Funcionalidad con alma artesanal',
    price: 115000,
    originalPrice: 150000,
    image: './img/prodOffers/mochila.webp',
    isNew: false,
    category: 'accesorio'
  }
]

const slides = [
  {
    img: './img/CallToActionStrip/01.png', alt: 'ponchos'
  },

  {
    img: './img/CallToActionStrip/02.png', alt: 'ponchos'
  },
  
  {
    img: './img/CallToActionStrip/03.png', alt: 'ponchos'
  },
  
  {
    img: './img/CallToActionStrip/04.png', alt: 'ponchos'
  },
  
  {
    img: './img/CallToActionStrip/05.png', alt: 'ponchos'
  },
  
  {
    img: './img/CallToActionStrip/06.png', alt: 'ponchos'
  },
  
  {
    img: './img/CallToActionStrip/07.png', alt: 'ponchos'
  },
  
  {
    img: './img/CallToActionStrip/08.png', alt: 'ponchos'
  },
  
  {
    img: './img/CallToActionStrip/09.png', alt: 'ponchos'
  },
  
  {
    img: './img/CallToActionStrip/10.png', alt: 'ponchos'
  },
  
  {
    img: './img/CallToActionStrip/11.png', alt: 'ponchos'
  },
  
  {
    img: './img/CallToActionStrip/12.png', alt: 'ponchos'
  },
  
  
]
</script>
