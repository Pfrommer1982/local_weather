<script setup lang="ts">
import { defineProps } from 'vue';


const props = defineProps(['weatherData']);


</script>

<template>
  <div v-if="weatherData" class="weather-info flex flex-col w-full h-full card glass p-6 ">
    
    <div class="flex flex-col text-center mb-4">
      <h2 class="text-2xl">{{ weatherData.location.name }} </h2>
      <h2 class="text-xl">{{ weatherData.location.country }} </h2>
    </div>
      
      <div class="flex flex-col justify-center items-center ">
        <p class="text-6xl mb-2"> {{ weatherData.current.temp_c }}°C</p>
        <p class="text-md italic mb-2">Feels like : {{ weatherData.current.feelslike_c }}°C</p>
        <p class="text-2xl ">{{ weatherData.current.condition.text }}</p>
      </div>

   
  </div>
</template>
