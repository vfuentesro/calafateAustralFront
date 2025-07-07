import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Products from '../views/Products.vue'
import SingleProduct from '../views/SingleProduct.vue'
import Offers from '../views/Offers.vue'
import PaymentMethods from '../views/PaymentMethods.vue'
import ShippingInfo from '../views/ShippingInfo.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/products',
    name: 'Products',
    component: Products,
  },
  {
    path: '/products/:id',
    name:'SingleProduct',
    component: SingleProduct,
    props: true, // This allows the route params to be passed as props to the component
  },
  {
    path:'/offers',
    name:'Offers',
    component: Offers,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue'),
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('../views/Checkout.vue'),
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: () => import('../views/Wishlist.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/about',
    name: 'AboutUs',
    component: () => import('../views/AboutUs.vue'),
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/Contact.vue'),
  },
  {
    path: '/payment-methods',
    name: 'PaymentMethods',
    component: PaymentMethods,
  },
  {
    path: '/returns-policy',
    name: 'ReturnsPolicy',
    component: () => import('../views/ReturnsPolicy.vue'),
  },
  {
    path: '/shipping-info',
    name: 'ShippingInfo',
    component: ShippingInfo,
  },
  {
    path: '/devoluciones',
    name: 'ReturnsPolicy',
    component: () => import('../views/ReturnsPolicy.vue'),
  },
  {
    path: '/privacidad',
    name: 'PrivacyPolicy',
    component: () => import('../views/PrivacyPolicy.vue'),
  },
  {
    path: '/getnet/mock-confirmation',
    name: 'MockConfirmation',
    component: () => import('../views/MockConfirmation.vue'),
  },
  {
    path: '/mi-cuenta',
    name: 'UserAccount',
    component: () => import('../views/UserAccount.vue'),
  },
  {
    path: '/purchase-confirmation',
    name: 'PurchaseConfirmation',
    component: () => import('../views/PurchaseConfirmation.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
})

export default router