<template>
  <div :style="{ backgroundColor: settings.background_color }" class="min-h-screen flex flex-col items-center justify-center text-center p-6">
    <h1 :style="{ color: settings.title_color }" :class="settings.title_size">{{ settings.title }}</h1>

    <img v-if="settings.image_path" :src="imageUrl(settings.image_path)" class="max-w-full h-auto my-6 rounded-xl shadow-lg" />

    <p class="text-lg mt-4">{{ settings.description }}</p>
  </div>
</template>

<script>
import api from '@/services/axios';

export default {
  data() {
    return {
      settings: {},
      errorMessage: ''
    };
  },
  methods: {
    // Método para obtener los datos de configuración
    async fetchSettings() {
      this.errorMessage = '';
      try {
        // Primero obtenemos el token CSRF si es necesario
        await api.get('/sanctum/csrf-cookie', { withCredentials: true });

        // Luego obtenemos los datos de la configuración de la página
        const response = await api.get('/api/home-settings', { withCredentials: true });
        this.settings = response.data;
      } catch (error) {
        this.errorMessage = 'Error al cargar la configuración de la página';
        console.error('Error:', error);
      }
    },

    // Método para generar la URL de la imagen
    imageUrl(path) {
      return `/storage/${path}`;
    }
  },
  mounted() {
    // Llamamos a la función fetchSettings cuando el componente se monte
    this.fetchSettings();
  }
};
</script>

<style scoped>
.error {
  color: red;
  text-align: center;
  margin-top: 10px;
}
</style>
