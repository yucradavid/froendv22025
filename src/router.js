import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from './components/LoginForm.vue';
import RegisterForm from './components/RegisterForm.vue';
import Dashboard from './components/UserDashboardPage.vue';
import ReservationForm from './components/ReservationForm.vue';
import 'bootstrap/dist/css/bootstrap.min.css';

// Rutas de la aplicación
const routes = [
  { path: '/login', component: LoginForm },
  { path: '/register', component: RegisterForm },
  {
    path: '/dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }  // Ruta protegida que requiere autenticación
  },
  {
    path: '/reservation/:tourId',
    name: 'reservation',
    component: ReservationForm
  },
  {
    path: '/tours',
    name: 'tours',
    component: () => import('./components/TourList.vue')
  },
  {
    path: '/reservations',
    name: 'reservations',
    component: () => import('./components/ReservationList.vue')
  },
  {
    path: '/payments',
    name: 'payments',
    component: () => import('./components/PaymentList.vue')
  },
  // Asegúrate de añadir la ruta de home si falta
  {
    path: '/',
    name: 'home',
    component: () => import('./components/HomeTuis.vue')  // Reemplaza por HomeTuis.vue si ya hiciste el cambio
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guard para proteger las rutas que requieren autenticación
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('authToken'); // Aquí debes verificar la autenticación (token, sesión, etc.)

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');  // Redirige al login si no está autenticado
  } else {
    next();  // Si está autenticado o no es una ruta protegida, permite el acceso
  }
});

export default router;
