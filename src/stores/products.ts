import { defineStore } from 'pinia';
import { ProductService } from '../services/api.service'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [] as any[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchProducts() {
      this.loading = true
      try {
        const raw = await ProductService.getAll()
        this.products = raw
        this.error = null
      } catch (e: any) {
        this.error = e.message
      } finally {
        this.loading = false
      }
    },
  },
})

export interface WishlistItem {
  id: number
  name: string
  price: number
  image: string
}

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    items: (JSON.parse(localStorage.getItem('wishlist_items') || '[]')) as WishlistItem[]
  }),
  getters: {
    total: (state) => state.items.length,
    isInWishlist: (state) => (id: number) => state.items.some(item => item.id === id),
  },
  actions: {
    addToWishlist(product: WishlistItem) {
      if (!this.items.some(item => item.id === product.id)) {
        this.items.push(product)
        this.saveWishlist()
      }
    },
    removeFromWishlist(id: number) {
      this.items = this.items.filter(item => item.id !== id)
      this.saveWishlist()
    },
    saveWishlist() {
      localStorage.setItem('wishlist_items', JSON.stringify(this.items))
    }
  }
})