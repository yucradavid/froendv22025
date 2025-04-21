
<template>
  <div class="login">
    <h2>Iniciar sesión</h2>
    <form @submit.prevent="onLogin">
      <div class="form-group">
        <label for="email">Correo Electrónico</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Contraseña</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Iniciar sesión</button>
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
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    ...mapActions(['login']),
    onLogin() {
      this.errorMessage = '';
      api.get('/sanctum/csrf-cookie', { withCredentials: true })
        .then(() => {
          api.post('/login', {
            email: this.email,
            password: this.password
          }, { withCredentials: true })
          .then(response => {
            const { user, token, roles } = response.data;
            localStorage.setItem('auth_token', token);
            localStorage.setItem('user_roles', JSON.stringify(roles));
            this.login({ ...user, roles });
            this.$router.push('/dashboard');
          })
          .catch(error => {
            this.errorMessage = 'Credenciales incorrectas';
            console.error('Login error:', error);
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