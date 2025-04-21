<template>
    <div>
      <h2>Lista de Tours</h2>
      <div v-if="tours.length === 0">
        <p>No hay tours disponibles.</p>
      </div>
      <div v-else>
        <div v-for="tour in tours" :key="tour.id" class="tour-card">
          <img :src="'/storage/' + tour.image" alt="Tour" />
          <h3>{{ tour.name }}</h3>
          <p>{{ tour.description }}</p>
          <p>Precio: S/. {{ tour.price }}</p>
          <button @click="selectTour(tour)">Seleccionar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import api from "@/services/axios";
  
  export default {
    data() {
      return {
        tours: [],
      };
    },
    mounted() {
      this.fetchTours();
    },
    methods: {
      // Obtener todos los tours
      fetchTours() {
    api
      .get("/tours")
      .then((response) => {
        this.tours = response.data;
        console.log("Tours fetched", this.tours); // Verifica los datos aquí
      })
      .catch((error) => {
        console.error("Error al obtener los tours:", error);
      });
      },
      // Seleccionar un tour para la reserva
      selectTour(tour) {
        this.$router.push({ name: "reservation", params: { tourId: tour.id } });
      },
    },
  };
  </script>
  
  <style scoped>
  .tour-card {
    border: 1px solid #ddd;
    padding: 20px;
    margin: 10px 0;
    border-radius: 5px;
    text-align: center;
  }
  
  .tour-card img {
    max-width: 100%;
    height: auto;
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
  