import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import axios from 'axios';
// Importa Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Importa los componentes
import LoginForm from './components/LoginForm.vue';
import RegisterForm from './components/RegisterForm.vue';
import UserDashboardPage from './components/UserDashboardPage.vue';
import HomeTuis from './components/HomeTuis.vue';  // Cambia HomeTuis por HomeTuis
 // Página principal
import HomeSettingsAdmin from './components/admin/HomeSettingsAdmin.vue'; // Componente de ajustes admin
import ReservationForm from './components/ReservationForm.vue';
import store from "@/store";

// Configura Axios para la API
axios.defaults.baseURL = 'http://localhost:8000/api';  // Cambia la URL si es necesario
axios.defaults.withCredentials = true;  // Habilita las cookies de sesión

// Define las rutas de la aplicación
const routes = [
  { path: '/login', component: LoginForm },
  { path: '/register', component: RegisterForm },
  { path: '/', component: HomeTuis },
  { path: '/admin/home-settings', component: HomeSettingsAdmin, meta: { requiresAuth: true } },
  { path: "/reservation/:tourId", name: "reservation", component: ReservationForm },
  { path: '/dashboard', component: UserDashboardPage, meta: { requiresAuth: true } },
];

// Crear una instancia del router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Configurar el guard para proteger rutas que requieren autenticación
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

// Crear la aplicación de Vue y montarla
createApp(App)
    .use(store)  // Usar Vuex
    .use(router)  // Usar Vue Router
    .mount('#app');
