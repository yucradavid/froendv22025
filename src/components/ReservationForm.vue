<template>
    <div>
      <h2>Reservar Tour: {{ tour.name }}</h2>
      <form @submit.prevent="makeReservation">
        <div class="form-group">
          <label for="quantity">Cantidad de personas</label>
          <input
            type="number"
            id="quantity"
            v-model="quantity"
            min="1"
            max="15"
            required
          />
        </div>
        <div class="form-group">
          <label for="reservation_date">Fecha de reserva</label>
          <input
            type="date"
            id="reservation_date"
            v-model="reservation_date"
            required
          />
        </div>
        <p>Total: S/. {{ totalPrice }}</p>
        <button type="submit">Confirmar Reserva</button>
      </form>
    </div>
  </template>
  
  <script>
  import api from "@/services/axios";
  import { mapGetters } from "vuex";
  
  export default {
    data() {
      return {
        tour: {},
        quantity: 1,
        reservation_date: "",
        totalPrice: 0,
      };
    },
    computed: {
      ...mapGetters(["isAuthenticated", "authToken"]),
    },
    mounted() {
      this.fetchTour();
    },
    watch: {
      quantity() {
        this.calculateTotal();
      },
    },
    methods: {
      // Obtener el tour desde la API
      fetchTour() {
        const tourId = this.$route.params.tourId;
        api
          .get(`/tours/${tourId}`)
          .then((response) => {
            this.tour = response.data;
            this.calculateTotal();
          })
          .catch((error) => {
            console.error("Error al obtener el tour:", error);
          });
      },
      // Calcular el precio total según la cantidad de personas
      calculateTotal() {
        if (this.tour && this.quantity) {
          this.totalPrice = this.tour.price * this.quantity;
        }
      },
      // Realizar la reserva
      makeReservation() {
        if (!this.isAuthenticated) {
          this.$router.push("/login");
          return;
        }
  
        const reservationData = {
          tour_id: this.tour.id,
          user_id: this.$store.state.user.id,
          quantity: this.quantity,
          reservation_date: this.reservation_date,
          total_price: this.totalPrice,
        };
  
        api
  .post("/reservations", reservationData, {
    headers: {
      Authorization: `Bearer ${this.authToken}`,
    },
  })
  .then(() => {  // Eliminamos la variable `response`
    this.$router.push("/dashboard");
  })
  .catch((error) => {
    console.error("Error al realizar la reserva:", error);
  });


      },
    },
  };
  </script>
  
  <style scoped>
  .form-group {
    margin-bottom: 20px;
  }
  
  input {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  button {
    background-color: #28a745;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #218838;
  }
  </style>
  