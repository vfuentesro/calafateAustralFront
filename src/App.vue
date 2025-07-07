<template>
  <div>
    <RouterView v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
    </RouterView>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from './stores/auth.store';

const authStore = useAuthStore();

onMounted(() => {
  authStore.checkAuth();
});
</script>

<style>
.slide-enter-active, .slide-leave-active {
  transition: transform 0.5s ease-in;
}
.slide-enter-from {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(-100%);
}

/* Ocultar barra de scroll en mobile, pero mantener scroll funcional */
@media (max-width: 768px) {
  html, body {
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
  }
  html::-webkit-scrollbar, body::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
}
</style>
