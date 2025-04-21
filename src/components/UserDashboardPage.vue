<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Barra lateral (Sidebar) -->
    <aside class="bg-gradient-to-r from-indigo-600 to-blue-600 text-white w-64 h-full fixed top-0 left-0 z-10 shadow-lg md:w-72 lg:w-80">
      <div class="p-6">
        <h2 class="text-3xl font-semibold text-white">Capachica Admin</h2>
        <nav class="mt-12">
          <ul class="space-y-4">
            <li>
              <router-link
                to="/dashboard"
                class="d-block py-3 px-6 rounded-lg text-lg font-medium text-white hover:bg-indigo-700 transition duration-200"
              >
                Dashboard
              </router-link>
            </li>
            <li>
              <router-link
                to="/tours"
                class="d-block py-3 px-6 rounded-lg text-lg font-medium text-white hover:bg-indigo-700 transition duration-200"
              >
                Tours
              </router-link>
            </li>
            <li>
              <router-link
                to="/reservations"
                class="d-block py-3 px-6 rounded-lg text-lg font-medium text-white hover:bg-indigo-700 transition duration-200"
              >
                Reservas
              </router-link>
            </li>
            <li>
              <router-link
                to="/payments"
                class="d-block py-3 px-6 rounded-lg text-lg font-medium text-white hover:bg-indigo-700 transition duration-200"
              >
                Pagos
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>

    <!-- Contenido principal -->
    <main class="ml-64 p-8 md:ml-72 lg:ml-80 md:p-10 lg:p-12">
      <header class="mb-10">
        <h1 class="text-4xl font-semibold text-gray-800">Bienvenido al Dashboard</h1>
        <p class="text-xl text-gray-600">Gestiona tus datos y operaciones desde aquí.</p>
      </header>

      <!-- Mensaje según el rol del usuario -->
      <section class="bg-white p-8 rounded-lg shadow-lg mb-6">
        <div v-if="userRole === 'cliente'">
          <p class="text-lg text-gray-700">
            Hola Cliente, explora tus destinos favoritos y haz tus reservas fácilmente.
          </p>
        </div>
        <div v-else-if="userRole === 'emprendedor'">
          <p class="text-lg text-gray-700">
            Hola Emprendedor, gestiona tus paquetes turísticos y obtén visibilidad de tus servicios.
          </p>
        </div>
        <div v-else-if="userRole === 'super-admin'">
          <p class="text-lg text-gray-700">
            Hola Super Admin, controla y administra la plataforma, gestiona usuarios y tours.
          </p>
        </div>
        <div v-else>
          <p class="text-lg text-gray-700">No tienes un rol asignado válido.</p>
        </div>
      </section>

      <!-- Botón de cierre de sesión -->
      <section class="mt-6">
        <button
          @click="logout"
          class="bg-red-600 text-white py-3 px-8 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300"
        >
          Cerrar sesión
        </button>
      </section>
    </main>
  </div>
</template>

<script>
import api from '@/services/axios';
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'userRole']),
  },
  methods: {
    logout() {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        alert('Token no encontrado. Inicia sesión nuevamente.');
        return;
      }

      api.get('/sanctum/csrf-cookie', { withCredentials: true }).then(() => {
        api
          .post(
            '/logout',
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then(() => {
            localStorage.removeItem('auth_token');
            this.$store.dispatch('logout');
            this.$router.push('/login');
          })
          .catch((err) => {
            console.error('Error al cerrar sesión', err);
          });
      });
    },
  },
};
</script>

<style scoped>
/* Barra lateral con gradiente */
aside {
  background: linear-gradient(180deg, rgba(75, 85, 99, 1) 0%, rgba(29, 78, 216, 1) 100%);
  box-shadow: 4px 0 8px rgba(0, 0, 0, 0.1);
  padding: 24px;
}

/* Contenido principal con espaciado adecuado */
main {
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 48px;
  padding-bottom: 24px;
}

/* Sección de mensajes con bordes redondeados y sombra */
section {
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
}

/* Botón de "Cerrar sesión" estilizado con Bootstrap */
button {
  transition: background-color 0.3s ease, transform 0.2s ease;
}

button:hover {
  transform: scale(1.05);
}

/* Medios para pantallas pequeñas */
@media (max-width: 768px) {
  aside {
    width: 100%;
    position: relative;
    box-shadow: none;
  }

  main {
    margin-left: 0;
    padding: 16px;
  }

  button {
    width: 100%;
  }
}
</style>
