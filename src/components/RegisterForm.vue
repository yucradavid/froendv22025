
<template>
  <div class="register">
    <h2>Registrar nuevo usuario</h2>
    <form @submit.prevent="onRegister">
      <div class="form-group">
        <label for="name">Nombre</label>
        <input v-model="name" type="text" required />
      </div>
      <div class="form-group">
        <label for="email">Correo Electrónico</label>
        <input v-model="email" type="email" required />
      </div>
      <div class="form-group">
        <label for="password">Contraseña</label>
        <input v-model="password" type="password" required />
      </div>
      <div class="form-group">
        <label for="password_confirmation">Confirmar Contraseña</label>
        <input v-model="password_confirmation" type="password" required />
      </div>
      <div class="form-group">
        <label for="role">Rol</label>
        <select v-model="role" required>
          <option value="cliente">Cliente</option>
          <option value="emprendedor">Emprendedor</option>
          <option value="super-admin">Super Admin</option>
        </select>
      </div>
      <button type="submit">Registrar</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import api from '@/services/axios';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      role: 'cliente',
      errorMessage: ''
    };
  },
  methods: {
    ...mapActions(['login']),
    onRegister() {
      this.errorMessage = '';
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
            const { user, token, roles } = response.data;
            localStorage.setItem('auth_token', token);
            localStorage.setItem('user_roles', JSON.stringify(roles));
            this.login({ ...user, roles });
            this.$router.push('/dashboard');
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
.error {
  color: red;
  text-align: center;
  margin-top: 10px;
}
</style>