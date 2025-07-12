# Calafate Austral - Front-end

Este es el front-end de la tienda Calafate Austral, desarrollado con Vue 3, TypeScript y Vite. Proporciona la interfaz de usuario para la experiencia de compra, visualización de productos, gestión de carrito y pagos.

## Características principales
- Vue 3 + TypeScript
- Vite para desarrollo rápido
- Pinia para gestión de estado
- Vue Router para navegación
- TailwindCSS para estilos
- Integración con API REST del back-end (Django)

## Instalación

1. Clona el repositorio y entra al directorio `front-end`:
   ```bash
   git clone <repo-url>
   cd front-end
   ```
2. Instala las dependencias:
   ```bash
   pnpm install
   # o
   npm install
   # o
   yarn install
   ```

## Scripts disponibles

- `pnpm dev` / `npm run dev` / `yarn dev`: Inicia el servidor de desarrollo en hot-reload.
- `pnpm build` / `npm run build` / `yarn build`: Compila la aplicación para producción.
- `pnpm preview` / `npm run preview` / `yarn preview`: Previsualiza la build de producción localmente.

## Dependencias principales
- [Vue 3](https://vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [Vue Toastification](https://vue-toastification.maronato.dev/)
- [Vue3 Carousel](https://ismail9k.github.io/vue3-carousel/)

## Estructura de carpetas
- `src/` - Código fuente principal
- `public/` - Archivos estáticos
- `dist/` - Build de producción

## Configuración
- El front-end espera que el back-end esté corriendo y accesible vía API REST.
- Configura la URL base de la API en `src/api/config.ts` si es necesario.

## Despliegue
1. Ejecuta `pnpm build` (o equivalente) para generar la build de producción en `dist/`.
2. Sirve la carpeta `dist/` con tu servidor web favorito (Nginx, Vercel, Netlify, etc).

## Notas
- Asegúrate de tener Node.js 18+ y pnpm/npm/yarn instalado.
- Para estilos, se utiliza TailwindCSS y PostCSS.
