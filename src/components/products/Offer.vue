<template>
    <div class="flex flex-col min-h-screen">
        <section>
            <!-- Banner -->
            <section class="relative w-full h-60">
                <img src="/img/hero1.svg" alt="Banner Tienda" class="w-full h-80 object-cover" />
                <div style="position:absolute;inset:0;background:black;opacity:0.5;width:100%;height:134%;" />
                <div class="absolute inset-0 flex flex-col justify-center items-center text-white">
                    <h1 class="text-4xl font-bold pt-12">Ofertas especiales</h1>
                    <p class="mt-2 text-sm"><router-link to="/">Inicio</router-link> &gt; Ofertas especiales</p>
                </div>
            </section>

            <!-- Filtros desplegables SIEMPRE visibles -->
            <div class="bg-white p-4 rounded-lg shadow-md mt-20 mb-6">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <!-- Botón Filtros a la izquierda -->
                    <div class="flex items-center">
                        <button 
                            @click="mostrarFiltros = !mostrarFiltros"
                            class="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium"
                        >
                            <Icon icon="mdi:filter" width="18" height="18" />
                            <span>Filtros</span>
                            <Icon 
                                :icon="mostrarFiltros ? 'mdi:chevron-up' : 'mdi:chevron-down'" 
                                width="16" 
                                height="16"
                            />
                        </button>
                    </div>

                    <!-- Texto de resultados -->
                    <div class="text-sm text-gray-600">
                        Mostrando {{ (currentPage - 1) * productsPerPage + 1 }}-{{ Math.min(currentPage * productsPerPage, productosFiltrados.length) }} de {{ productosFiltrados.length }} resultados
                    </div>

                    <!-- Controles de ordenamiento -->
                    <div class="flex flex-col sm:flex-row gap-4">
                        <!-- Selector de items por página -->
                        <div class="flex items-center space-x-2">
                            <span class="text-sm text-gray-600">Mostrar</span>
                            <select 
                                v-model="productsPerPage"
                                class="border border-gray-300 rounded px-3 py-2 text-sm"
                            >
                                <option value="8">8</option>
                                <option value="16">16</option>
                                <option value="24">24</option>
                                <option value="32">32</option>
                            </select>
                        </div>

                        <!-- Selector de ordenamiento -->
                        <div class="flex items-center space-x-2">
                            <span class="text-sm text-gray-600">Ordenar</span>
                            <select 
                                v-model="ordenSeleccionado"
                                class="border border-gray-300 rounded px-3 py-2 text-sm"
                            >
                                <option value="default">Por defecto</option>
                                <option value="price-asc">Precio: Menor a Mayor</option>
                                <option value="price-desc">Precio: Mayor a Menor</option>
                                <option value="discount">Mayor descuento</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Filtros avanzados (se muestra/oculta) -->
                <div v-if="mostrarFiltros" class="mt-4 pt-4 border-t border-gray-200">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <!-- Filtro por nombre -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Buscar por nombre</label>
                            <input
                                type="text"
                                v-model="filtroNombre"
                                placeholder="Nombre del producto"
                                class="border border-gray-300 rounded px-3 py-2 w-full text-sm"
                            />
                        </div>

                        <!-- Filtro por precio -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Rango de precios</label>
                            <div class="flex items-center space-x-2">
                                <input
                                    type="number"
                                    v-model.number="filtroPrecioMin"
                                    placeholder="Mínimo"
                                    @change="handlePriceInputChange('min')"
                                    class="border border-gray-300 rounded px-3 py-2 w-full text-sm"
                                >
                                <input
                                    type="number"
                                    v-model.number="filtroPrecioMax"
                                    placeholder="Máximo"
                                    @change="handlePriceInputChange('max')"
                                    class="border border-gray-300 rounded px-3 py-2 w-full text-sm"
                                >
                            </div>
                        </div>

                        <!-- Filtro por descuento -->
                        <div class="flex items-end">
                            <label class="flex items-center space-x-2">
                                <input 
                                    type="checkbox" 
                                    v-model="filtroDescuento" 
                                    class="rounded text-pink-600"
                                >
                                <span class="text-sm text-gray-700 py-8">Solo con descuento</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Productos en oferta -->
            <section class="py-5 md:py-8 bg-gray-100 px-4 flex-grow">
                <div v-if="visibleProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
                    <ProductCard
                        v-for="(product, index) in visibleProducts"
                        :key="product.id_producto"
                        :product="product"
                        :hovered="hoveredIndex === index"
                        @hover="val => hoveredIndex = val ? index : null"
                        :onAddToCart="(product, quantity = 1) => handleAddToCart(product, quantity)"
                        :onShare="handleShare"
                        :onAddToWishlist="handleAddToWishlist"
                        :onGoToProduct="goToProduct"
                    />
                </div>
                <div v-else class="flex flex-col items-center justify-center py-16">
                    <span class="text-gray-500 text-lg font-semibold">No se encontraron productos que coincidan con la búsqueda.</span>
                </div>
                <!-- Paginación -->
                <nav v-if="totalPages > 1" class="flex justify-center mt-8 space-x-2" aria-label="Pagination">
                    <button
                        @click="currentPage = Math.max(currentPage - 1, 1)"
                        :disabled="currentPage === 1"
                        class="px-3 py-1 bg-gray-200 rounded hover:bg-pink-200 disabled:opacity-50"
                    >
                        &laquo;
                    </button>
                    <button
                        v-for="page in totalPages"
                        :key="page"
                        @click="currentPage = page"
                        :class="[
                            'px-3 py-1 rounded',
                            currentPage === page ? 'bg-amber-500 text-white' : 'bg-gray-100 hover:bg-pink-200'
                        ]"
                    >
                        {{ page }}
                    </button>
                    <button
                        @click="currentPage = Math.min(currentPage + 1, totalPages)"
                        :disabled="currentPage === totalPages"
                        class="px-3 py-1 bg-gray-200 rounded hover:bg-pink-200 disabled:opacity-50"
                    >
                        &raquo;
                    </button>
                </nav>
            </section>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useProductStore } from '../../stores/products'
import { useCartStore } from '../../stores/cart.store'
import { useWishlistStore } from '../../stores/products'
import { useRouter } from 'vue-router'
import ProductCard from './ProductCard.vue'
import { useToast } from 'vue-toastification'

const productStore = useProductStore()
const cartStore = useCartStore()
const wishlist = useWishlistStore()
const router = useRouter()
const toast = useToast()

// Filtros y controles
const mostrarFiltros = ref(false)
const filtroNombre = ref('')
const filtroPrecioMin = ref<number | null>(null)
const filtroPrecioMax = ref<number | null>(null)
const filtroDescuento = ref(true)
const ordenSeleccionado = ref('default')
const productsPerPage = ref(8)
const currentPage = ref(1)

// Hover states
const hoveredIndex = ref<number | null>(null)

// Filtrado y ordenamiento
const productosFiltrados = computed(() => {
    let filtered = productStore.products.slice()
    if (filtroNombre.value) {
        filtered = filtered.filter((p: any) =>
            p.nombre_p.toLowerCase().includes(filtroNombre.value.toLowerCase())
        )
    }
    if (filtroPrecioMin.value !== null) {
        filtered = filtered.filter((p: any) =>
            discountedPrice(p) >= (filtroPrecioMin.value ?? 0)
        )
    }
    if (filtroPrecioMax.value !== null) {
        filtered = filtered.filter((p: any) =>
            discountedPrice(p) <= (filtroPrecioMax.value ?? 0)
        )
    }
    if (filtroDescuento.value) {
        filtered = filtered.filter((p: any) => getDiscount(p) > 0)
    }
    // Ordenamiento
    switch (ordenSeleccionado.value) {
        case 'price-asc':
            filtered = filtered.slice().sort((a: any, b: any) => discountedPrice(a) - discountedPrice(b))
            break
        case 'price-desc':
            filtered = filtered.slice().sort((a: any, b: any) => discountedPrice(b) - discountedPrice(a))
            break
        case 'discount':
            filtered = filtered.slice().sort((a: any, b: any) => getDiscount(b) - getDiscount(a))
            break
        default:
            break
    }
    // Solo mostrar productos en oferta (por ejemplo, si quieres mostrar solo productos con algún descuento o alguna otra lógica, ajusta aquí)
    return filtered
})

const totalPages = computed(() =>
    Math.max(1, Math.ceil(productosFiltrados.value.length / productsPerPage.value))
)

const visibleProducts = computed(() => {
    const start = (currentPage.value - 1) * productsPerPage.value
    const end = start + productsPerPage.value
    return productosFiltrados.value.slice(start, end)
})

function getDiscount(product: any) {
    if (product.id_oferta && typeof product.id_oferta === 'object' && product.id_oferta.descuento) {
        return Number(product.id_oferta.descuento)
    }
    return 0
}

function discountedPrice(product: any) {
    const price = Number(product.precio_p)
    const discount = getDiscount(product)
    if (isNaN(price) || isNaN(discount)) return 0
    return price - (price * discount) / 100
}

function handleAddToCart(product: any, quantity = 1) {
    cartStore.addItem(product, quantity)
    toast.success('Producto añadido al carrito')
}

function handleShare(product: any) {
    const url = window.location.origin + '/products/' + product.id_producto
    navigator.clipboard.writeText(url)
    toast.info('Enlace copiado al portapapeles')
}

function handleAddToWishlist(product: any) {
    wishlist.addToWishlist({
        id: product.id_producto,
        name: product.nombre_p,
        price: product.precio_p,
        image: product.imagen
    })
    toast.success('Producto añadido a deseados')
}

// Manejo de cambios en inputs de precio
function handlePriceInputChange(type: 'min' | 'max') {
    if (type === 'min' && filtroPrecioMin.value !== null && filtroPrecioMin.value < 0) {
        filtroPrecioMin.value = 0
    }
    if (type === 'max' && filtroPrecioMax.value !== null && filtroPrecioMax.value < 0) {
        filtroPrecioMax.value = 0
    }
    if (
        filtroPrecioMin.value !== null &&
        filtroPrecioMax.value !== null &&
        filtroPrecioMin.value > filtroPrecioMax.value
    ) {
        filtroPrecioMax.value = filtroPrecioMin.value
    }
}

// Resetear página al cambiar filtros
watch([filtroNombre, filtroPrecioMin, filtroPrecioMax, filtroDescuento, ordenSeleccionado, productsPerPage], () => {
    currentPage.value = 1
})

const goToProduct = (id: number) => {
    router.push({ name: 'SingleProduct', params: { id } });
};
</script>