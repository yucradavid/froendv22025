<template>
  <div class="p-6 max-w-3xl mx-auto">
    <h2 class="text-2xl font-bold mb-4">Editar Página Principal</h2>

    <form @submit.prevent="submitForm" enctype="multipart/form-data">
      <div class="mb-4">
        <label class="block font-medium">Título</label>
        <input v-model="form.title" class="w-full border rounded p-2" type="text">
      </div>

      <div class="mb-4">
        <label class="block font-medium">Color del título</label>
        <input v-model="form.title_color" class="w-full border rounded p-2" type="color">
      </div>

      <div class="mb-4">
        <label class="block font-medium">Tamaño del título</label>
        <select v-model="form.title_size" class="w-full border rounded p-2">
          <option value="text-xl">Pequeño</option>
          <option value="text-3xl">Mediano</option>
          <option value="text-5xl">Grande</option>
        </select>
      </div>

      <div class="mb-4">
        <label class="block font-medium">Descripción</label>
        <textarea v-model="form.description" class="w-full border rounded p-2"></textarea>
      </div>

      <div class="mb-4">
        <label class="block font-medium">Color de fondo</label>
        <input v-model="form.background_color" type="color" class="w-full border rounded p-2">
      </div>

      <div class="mb-4">
        <label class="block font-medium">Imagen</label>
        <input type="file" @change="handleFileChange" class="w-full">
        <div v-if="form.image_path" class="mt-2">
          <img :src="imageUrl(form.image_path)" class="w-48 h-auto rounded-lg shadow">
        </div>
      </div>

      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Guardar</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      form: {
        title: '',
        title_color: '#000000',
        title_size: 'text-3xl',
        description: '',
        background_color: '#ffffff',
        image_path: '',
      },
      imageFile: null
    }
  },
  methods: {
    async fetchSettings() {
      const res = await axios.get('/api/home-settings')
      if (res.data) {
        this.form = { ...this.form, ...res.data }
      }
    },
    imageUrl(path) {
      return `/storage/${path}`
    },
    handleFileChange(event) {
      this.imageFile = event.target.files[0]
    },
    async submitForm() {
      const formData = new FormData()
      Object.entries(this.form).forEach(([key, value]) => {
        formData.append(key, value)
      })

      if (this.imageFile) {
        formData.append('image_path', this.imageFile)
      }

      await axios.post('/api/home-settings', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      alert('Guardado correctamente')
    }
  },
  mounted() {
    this.fetchSettings()
  }
}
</script>
