import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import store from '@/store'; // Si estás usando Vuex para manejar el estado
import HomePage from './components/HomeTuis.vue';  // Cambia Home por HomePage
import HomeSettingsAdmin from './components/admin/HomeSettingsAdmin.vue';
import ReservationForm from '@/components/ReservationForm.vue';
import 'bootstrap/dist/css/bootstrap.min.css';

const routes = [
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/', component: HomePage },
    { path: '/admin/home-settings', component: HomeSettingsAdmin, meta: { requiresAuth: true } },
    { path: "/reservation/:tourId", name: "reservation", component: ReservationForm },
    { path: '/dashboard', component: () => import('../views/UserDashboardPage.vue'), meta: { requiresAuth: true } },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

// Guard para proteger rutas que requieren autenticación
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
        next('/login');
    } else {
        next();
    }
});

export default router;
