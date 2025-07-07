<template>
  <div class="test-connection">
    <h2>Test de Conexión</h2>
    <button @click="testConnection" class="test-button">
      Probar Conexión
    </button>
    <div v-if="message" :class="['message', status]">
      {{ message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import apiClient from '../api/config'

const message = ref('')
const status = ref('')

const testConnection = async () => {
  try {
    const response = await apiClient.get('/test/')
    message.value = response.data.message
    status.value = 'success'
  } catch (error) {
    message.value = 'Error al conectar con el backend'
    status.value = 'error'
  }
}
</script>

<style scoped>
.test-connection {
  padding: 20px;
  text-align: center;
}

.test-button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 10px 0;
}

.test-button:hover {
  background-color: #45a049;
}

.message {
  margin-top: 10px;
  padding: 10px;
  border-radius: 4px;
}

.success {
  background-color: #dff0d8;
  color: #3c763d;
  border: 1px solid #d6e9c6;
}

.error {
  background-color: #f2dede;
  color: #a94442;
  border: 1px solid #ebccd1;
}
</style> 