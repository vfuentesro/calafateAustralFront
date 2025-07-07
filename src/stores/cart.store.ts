import { defineStore } from 'pinia';
import type { Product } from '../models/Product';

export type CartItem = {
  product: Product;
  quantity: number;
};

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => {
    const savedCart = localStorage.getItem('cart');
    return {
      items: savedCart ? JSON.parse(savedCart) : [],
      isOpen: false
    };
  },

  getters: {
    totalItems: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
    totalAmount: (state) => state.items.reduce((total, item) => total + (item.product.precio_p * item.quantity), 0),
    cartItems: (state) => state.items
  },

  actions: {
    addItem(product: Product, quantity: number = 1) {
      const existingItem = this.items.find(item => item.product.id_producto === product.id_producto);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.items.push({ product, quantity });
      }

      // Guardar en localStorage
      this.saveToLocalStorage();
    },

    removeItem(productId: number) {
      const index = this.items.findIndex(item => item.product.id_producto === productId);
      if (index > -1) {
        this.items.splice(index, 1);
        this.saveToLocalStorage();
      }
    },

    updateQuantity(productId: number, quantity: number) {
      const item = this.items.find(item => item.product.id_producto === productId);
      if (item) {
        item.quantity = quantity;
        this.saveToLocalStorage();
      }
    },

    clearCart() {
      this.items = [];
      localStorage.removeItem('cart');
    },

    toggleCart() {
      this.isOpen = !this.isOpen;
    },

    loadFromLocalStorage() {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        this.items = JSON.parse(savedCart);
      }
    },

    saveToLocalStorage() {
      localStorage.setItem('cart', JSON.stringify(this.items));
    }
  }
}); 