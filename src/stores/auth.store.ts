import { defineStore } from 'pinia';
import { AuthService } from '../services/api.service';
import type { User } from '../models/User';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  showLoginModal: boolean;
}

let inactivityTimeout: ReturnType<typeof setTimeout> | null = null;
const INACTIVITY_LIMIT = 15 * 60 * 1000; // 15 minutos
let _inactivityHandler: ((evt: Event) => void) | null = null;
const LOCAL_STORAGE_KEY = 'authUser';

function resetInactivityTimer(onTimeout?: () => void) {
  if (inactivityTimeout) clearTimeout(inactivityTimeout);
  inactivityTimeout = setTimeout(() => {
    if (typeof onTimeout === 'function') onTimeout();
  }, INACTIVITY_LIMIT);
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || 'null'),
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem(LOCAL_STORAGE_KEY),
    showLoginModal: false
  }),

  getters: {
    currentUser: (state) => state.user,
    isLoggedIn: (state) => state.isAuthenticated
  },

  actions: {
    async login(email: string, password: string) {
      try {
        const response = await AuthService.login(email, password);
        console.log('Respuesta login backend:', response);
        if (response.status === 200 || response.status === 201) {
          // Obtener usuario actual desde el backend
          const user = await AuthService.getCurrentUser();
          this.user = user;
          this.isAuthenticated = true;
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
          // Guardar usuario completo y estado en localStorage
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('isLoggedIn', 'true');
          if (response.data && response.data.access) {
            this.token = response.data.access;
            localStorage.setItem('token', response.data.access);
          }
          return true;
        } else {
          this.isAuthenticated = false;
          localStorage.removeItem('user');
          localStorage.setItem('isLoggedIn', 'false');
          localStorage.removeItem('token');
          localStorage.removeItem(LOCAL_STORAGE_KEY);
          // Mostrar mensaje de error real si existe
          if (response.data && response.data.detail) {
            throw new Error(response.data.detail);
          }
          return false;
        }
      } catch (error: any) {
        console.error('Error en login:', error);
        this.isAuthenticated = false;
        localStorage.removeItem('user');
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.removeItem('token');
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        // Si el error tiene mensaje, lánzalo para mostrarlo en el modal
        if (error && error.message) {
          throw new Error(error.message);
        }
        return false;
      }
    },

    async register(userData: {
      email: string;
      password: string;
      nombre: string;
      apellido: string;
    }) {
      try {
        const user = await AuthService.register(userData);
        return user;
      } catch (error) {
        console.error('Error en registro:', error);
        throw error;
      }
    },

    async logout() {
      try {
       await AuthService.logout();
      } catch (error) {
        console.error('Error en logout:', error);
      } finally {
        this.token = null;
        this.user = null;
        this.isAuthenticated = false;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    },

    async checkAuth() {
      try {
        const user = await AuthService.getCurrentUser();
        this.user = user;
        this.isAuthenticated = true;
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
      } catch (error) {
        console.error('Error al verificar autenticación:', error);
        this.token = null;
        this.user = null;
        this.isAuthenticated = false;
        localStorage.removeItem('token');
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    },

    startInactivityWatcher(onTimeout?: () => void) {
      // Escucha eventos de usuario para resetear el timer
      const events = ['mousemove', 'keydown', 'mousedown', 'touchstart'];
      if (_inactivityHandler) {
        events.forEach(e => window.removeEventListener(e, _inactivityHandler!));
      }
      _inactivityHandler = () => resetInactivityTimer(onTimeout);
      events.forEach(e => window.addEventListener(e, _inactivityHandler!));
      resetInactivityTimer(onTimeout);
    },

    stopInactivityWatcher() {
      if (inactivityTimeout) clearTimeout(inactivityTimeout);
      const events = ['mousemove', 'keydown', 'mousedown', 'touchstart'];
      if (_inactivityHandler) {
        events.forEach(e => window.removeEventListener(e, _inactivityHandler!));
      }
    },

    openLoginModal() {
      this.showLoginModal = true;
    },

    closeLoginModal() {
      this.showLoginModal = false;
    }
  }
}); 