<template>
  <div>
    <Header />
    <!-- Título centrado absoluto, fuera del grid -->
    <h2 class="text-3xl mt-10 font-bold text-yellow-700 z-10 text-center w-full mb-8 hidden md:block">Registro</h2>
    <div class="flex min-h-screen items-center justify-center bg-white relative">
      <div class="w-full max-w-6xl flex flex-col md:flex-row bg-white shadow-md rounded-lg overflow-hidden relative border-t border-b border-gray-200 py-10">
        <!-- Columna izquierda (Titular + Contraseña) -->
        <div class="w-full md:w-1/2 flex flex-col justify-start relative">
          <h3 class="text-2xl ml-8 font-semibold text-yellow-700 hidden md:block">Titular de la cuenta</h3>
          <div class="p-8">
            <!-- Título solo visible en mobile -->
            <h2 class="text-3xl font-bold mb-4 text-center text-yellow-700 md:hidden">Registro</h2>
            <div class="space-y-8">
              <div class="border-b border-gray-200 pb-6">
                <div class="space-y-4">
                  <div>
                    <label class="block font-medium mb-1" for="nombre">Nombres*</label>
                    <input id="nombre" type="text" v-model="form.nombre" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600" />
                  </div>
                  <div>
                    <label class="block font-medium mb-1" for="apellido">Apellidos*</label>
                    <input id="apellido" type="text" v-model="form.apellido" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600" />
                  </div>
                  <div>
                    <label class="block font-medium mb-1" for="rut_numero">RUT*</label>
                    <div class="flex gap-2">
                      <input id="rut_numero" type="text" v-model="form.rut_numero" required placeholder="12345678" class="w-3/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600" maxlength="8" inputmode="numeric" pattern="[0-9]{1,8}" @input="form.rut_numero = form.rut_numero.replace(/[^0-9]/g, '').slice(0,8)" />
                      <span class="self-center">-</span>
                      <input id="rut_dv" type="text" v-model="form.rut_dv" required maxlength="1" placeholder="DV" class="w-1/4 px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 pointer-events-none" readonly tabindex="-1" @keydown.prevent @paste.prevent />
                    </div>
                    <div class="text-xs text-gray-500">RUT sin puntos sin dígito verificador ni guión.</div>
                  </div>
                  <div>
                    <label class="block font-medium mb-1" for="email">Correo electrónico*</label>
                    <input id="email" type="email" v-model="form.email" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600" />
                  </div>
                  <div>
                    <label class="block font-medium mb-1" for="telefono">Teléfono*</label>
                    <div class="flex items-center">
                      <span class="inline-block px-2 py-2 bg-gray-100 border border-gray-300 rounded-l">+56</span>
                      <input
                        :value="telefonoFormateado"
                        @input="onTelefonoInput"
                        type="tel"
                        required
                        maxlength="11"
                        pattern="[0-9 ]{11,12}"
                        placeholder="9 1234 5678 o 2 2345 6789"
                        class="w-full border border-l-0 rounded-r px-4 py-2"
                      />
                    </div>
                    <div class="text-xs text-gray-500">Ejemplo: 9 1234 5678 (celular) o 2 2345 6789 (fijo). El número debe tener 9 dígitos.</div>
                  </div>
                </div>
              </div>
              <div class="pb-6">
                <h3 class="text-lg font-semibold mb-4 text-yellow-700">Contraseña</h3>
                <div class="space-y-4">
                  <div>
                    <label class="block font-medium mb-1" for="password">Contraseña*</label>
                    <input id="password" type="password" v-model="form.password" required minlength="8" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600" />
                    <p class="text-xs text-gray-500 mt-1">Mínimo 8 caracteres</p>
                  </div>
                  <div>
                    <label class="block font-medium mb-1" for="confirmPassword">Repite la contraseña*</label>
                    <input id="confirmPassword" type="password" v-model="form.confirmPassword" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Separador vertical solo en desktop -->
          <div class="hidden md:block absolute top-0 right-0 h-full w-px bg-gray-200"></div>
        </div>
        <!-- Columna derecha (Dirección de envío) -->
        <div class="w-full md:w-1/2 flex flex-col justify-start">
          <h3 class="text-2xl ml-8 font-semibold text-yellow-700 hidden md:block">Dirección de envío</h3>
          <div class="p-8">
            <h3 class="text-2xl font-bold mb-8 text-yellow-700 text-center md:hidden">Dirección de envío</h3>
            <div class="space-y-4">
              <div>
                <label class="block font-medium mb-1" for="region">Región*</label>
                <select id="region" v-model="form.region" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600">
                  <option value="">Selecciona una región</option>
                  <option value="arica">Arica y Parinacota</option>
                  <option value="tarapaca">Tarapacá</option>
                  <option value="antofagasta">Antofagasta</option>
                  <option value="atacama">Atacama</option>
                  <option value="coquimbo">Coquimbo</option>
                  <option value="valparaiso">Valparaíso</option>
                  <option value="metropolitana">Metropolitana de Santiago</option>
                  <option value="ohiggins">Libertador General Bernardo O'Higgins</option>
                  <option value="maule">Maule</option>
                  <option value="nuble">Ñuble</option>
                  <option value="biobio">Biobío</option>
                  <option value="araucania">La Araucanía</option>
                  <option value="rios">Los Ríos</option>
                  <option value="lagos">Los Lagos</option>
                  <option value="aysen">Aysén del General Carlos Ibáñez del Campo</option>
                  <option value="magallanes">Magallanes y de la Antártica Chilena</option>
                </select>
              </div>
              <div>
                <label class="block font-medium mb-1" for="comuna">Comuna*</label>
                <input id="comuna" type="text" v-model="form.comuna" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600" placeholder="Ingresa tu comuna" />
              </div>
              <div>
                <label class="block font-medium mb-1" for="calle">Calle*</label>
                <input id="calle" type="text" v-model="form.calle" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600" />
              </div>
              <div>
                <label class="block font-medium mb-1" for="numero">Número*</label>
                <input id="numero" type="text" v-model="form.numero" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600" />
              </div>
              <div>
                <label class="block font-medium mb-1" for="depto">N° de Depto/Oficina/Otro</label>
                <input id="depto" type="text" v-model="form.depto" placeholder="Opcional" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600" />
              </div>
              <div>
                <label class="block font-medium mb-1" for="nombreReceptor">Nombre de quien recibe*</label>
                <input id="nombreReceptor" type="text" v-model="form.nombreReceptor" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600" />
              </div>
              <div>
                <label class="block font-medium mb-1" for="telefonoReceptor">Teléfono de quien recibe*</label>
                <div class="flex items-center">
                  <span class="inline-block px-2 py-2 bg-gray-100 border border-gray-300 rounded-l">+56</span>
                  <input
                    :value="telefonoReceptorFormateado"
                    @input="onTelefonoReceptorInput"
                    type="tel"
                    required
                    maxlength="11"
                    pattern="[0-9 ]{11,12}"
                    placeholder="9 1234 5678 o 2 2345 6789"
                    class="w-full border border-l-0 rounded-r px-4 py-2"
                  />
                </div>
                <div class="text-xs text-gray-500">Ejemplo: 9 1234 5678 (celular) o 2 2345 6789 (fijo). El número debe tener 9 dígitos.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Botón de registro debajo de todo el formulario -->
    <div class="mt-10 flex justify-center mb-12">
      <button type="button" class="text-2xl w-full md:w-1/3 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-6 px-10 rounded-lg transition-colors shadow-md" @click="handleSubmit">Registrarse</button>
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import { useToast } from 'vue-toastification'
import axios from 'axios'
import { getCookie } from '../api/csrf'

const router = useRouter()
const toast = useToast()
const form = ref({
  nombre: '', apellido: '', rut_numero: '', rut_dv: '', email: '', telefono: '',
  password: '', confirmPassword: '', region: '', comuna: '', calle: '', numero: '', depto: '', nombreReceptor: '', telefonoReceptor: ''
})
const telefonoFormateado = ref('')
const telefonoReceptorFormateado = ref('')

// Función para calcular el dígito verificador del RUT
function calcularDV(rut: string): string {
  let suma = 0;
  let multiplo = 2;
  for (let i = rut.length - 1; i >= 0; i--) {
    suma += parseInt(rut.charAt(i), 10) * multiplo;
    multiplo = multiplo === 7 ? 2 : multiplo + 1;
  }
  const dv = 11 - (suma % 11);
  if (dv === 11) return '0';
  if (dv === 10) return 'K';
  return dv.toString();
}

// Watcher para actualizar automáticamente el DV
watch(() => form.value.rut_numero, (nuevoRut) => {
  if (/^\d+$/.test(nuevoRut) && nuevoRut.length >= 7) {
    form.value.rut_dv = calcularDV(nuevoRut);
  } else {
    form.value.rut_dv = '';
  }
});

function formatTelefono(val: string): string {
  const digits = val.replace(/[^0-9]/g, '').slice(0, 9)
  if (!digits) return ''
  if (digits.length <= 1) return digits
  if (digits.length <= 5) return digits[0] + ' ' + digits.slice(1)
  return digits[0] + ' ' + digits.slice(1, 5) + ' ' + digits.slice(5)
}

function onTelefonoInput(e: Event) {
  const target = e.target as HTMLInputElement;
  telefonoFormateado.value = formatTelefono(target.value)
  form.value.telefono = telefonoFormateado.value.replace(/ /g, '')
}

watch(() => form.value.telefono, (nuevo) => {
  telefonoFormateado.value = formatTelefono(nuevo)
})

function onTelefonoReceptorInput(e: Event) {
  const target = e.target as HTMLInputElement;
  telefonoReceptorFormateado.value = formatTelefono(target.value)
  form.value.telefonoReceptor = telefonoReceptorFormateado.value.replace(/ /g, '')
}

watch(() => form.value.telefonoReceptor, (nuevo) => {
  telefonoReceptorFormateado.value = formatTelefono(nuevo)
})

async function handleSubmit() {
  // Validaciones...
  if (form.value.password !== form.value.confirmPassword) {
    toast.error('Las contraseñas no coinciden')
    return
  }
  if (form.value.password.length < 8) {
    toast.error('La contraseña debe tener al menos 8 caracteres')
    return
  }
  if (!form.value.rut_numero || !form.value.rut_dv || !/^[0-9]{7,8}$/.test(form.value.rut_numero) || !/^[0-9kK]$/.test(form.value.rut_dv)) {
    toast.error('Por favor ingresa un RUT válido (formato: 12345678-9)')
    return
  }
  if (!form.value.region) {
    toast.error('Por favor selecciona una región')
    return
  }
  if (!form.value.comuna) {
    toast.error('Por favor ingresa tu comuna')
    return
  }
  if (!/^\d{9}$/.test(form.value.telefono)) {
    toast.error('El teléfono debe tener exactamente 9 dígitos')
    return
  }
  if (!/^\d{9}$/.test(form.value.telefonoReceptor)) {
    toast.error('El teléfono de quien recibe debe tener exactamente 9 dígitos')
    return
  }

  // Construir el payload para Django
  const payload = new URLSearchParams({
    rut: form.value.rut_numero + '-' + form.value.rut_dv,
    nombre_u: form.value.nombre,
    apellido_u: form.value.apellido,
    correo_u: form.value.email,
    numero_telefono_u: '+56' + form.value.telefono,
    contrasena: form.value.password,
    confirmar_contrasena: form.value.confirmPassword,
    region: form.value.region,
    comuna: form.value.comuna,
    calle: form.value.calle,
    numero: form.value.numero,
    numero_departamento_oficina_otro: form.value.depto || '',
    nombre_receptor: form.value.nombreReceptor,
    telefono_receptor: '+56' + form.value.telefonoReceptor
  })

  try {
    const csrfToken = getCookie('csrftoken')
    await axios.post(
      '/compra/registro-usuario/',
      payload,
      {
        withCredentials: true,
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRFToken': csrfToken,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )
    // Si el registro fue exitoso, guardar en localStorage y redirigir
    localStorage.setItem('user', JSON.stringify({ ...form.value }))
    localStorage.setItem('isLoggedIn', 'true')
    toast.success('¡Registro exitoso!')
    router.push('/')
  } catch (e) {
    toast.error('Error al registrar usuario. Intenta nuevamente.')
  }
}

onMounted(async () => {
  try {
    await axios.get('/api/csrf/', { withCredentials: true })
  } catch (e) {
    // Ignorar error, solo queremos la cookie
  }
})
</script>

<style scoped>
select {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1em;
}

@media (max-width: 767px) {
  .flex-col {
    flex-direction: column;
  }
  .w-full {
    width: 100%;
  }
}
</style> 