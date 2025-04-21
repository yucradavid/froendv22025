<template>
  <div class="register">
    <h2>Registrar nuevo usuario</h2>
    <form @submit.prevent="onRegister">
      <div class="form-group">
        <label for="name">Nombre</label>
        <input
          type="text"
          id="name"
          v-model="name"
          required
          placeholder="Ingrese su nombre"
        />
      </div>
      <div class="form-group">
        <label for="email">Correo Electrónico</label>
        <input
          type="email"
          id="email"
          v-model="email"
          required
          placeholder="Ingrese su correo electrónico"
        />
      </div>
      <div class="form-group">
        <label for="password">Contraseña</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
          placeholder="Ingrese su contraseña"
        />
      </div>
      <div class="form-group">
        <label for="password_confirmation">Confirmar Contraseña</label>
        <input
          type="password"
          id="password_confirmation"
          v-model="password_confirmation"
          required
          placeholder="Confirme su contraseña"
        />
      </div>
      <div class="form-group">
        <label for="role">Rol</label>
        <select id="role" v-model="role" required>
          <option value="cliente">Cliente</option>
          <option value="emprendedor">Emprendedor</option>
          <option value="super-admin">Super Admin</option>
        </select>
      </div>
      <button type="submit" class="btn">Registrar</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import api from '@/services/axios'; // Instancia de Axios configurada

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      role: 'cliente', // Valor por defecto
      errorMessage: ''
    };
  },
  methods: {
    onRegister() {
      this.errorMessage = ''; // Reset error message before making the request

      api.get('/sanctum/csrf-cookie', { withCredentials: true })
        .then(() => {
          api.post('/register', {
            name: this.name,
            email: this.email,
            password: this.password,
            password_confirmation: this.password_confirmation,
            role: this.role
          }, { withCredentials: true })
            .then(response => {
              localStorage.setItem('auth_token', response.data.token); // Guardar token en localStorage
              this.$router.push('/dashboard'); // Redirigir al dashboard
            })
            .catch(error => {
              this.errorMessage = error.response?.data?.error || 'Error al registrar el usuario';
              console.error('Register error:', error);
            });
        })
        .catch(error => {
          this.errorMessage = 'Error al obtener CSRF Token';
          console.error('CSRF error:', error);
        });
    }
  }
};
</script>

<style scoped>
.register {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

input, select {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}

.error {
  color: red;
  text-align: center;
  margin-top: 20px;
}
</style>
