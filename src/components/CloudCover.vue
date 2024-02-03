  <script setup lang="ts">
  import { defineProps } from "vue";
  import Vue3AutoCounter from "vue3-autocounter";

  
  const props = defineProps(["weatherData"]);

  </script>
  
<template>
    <div class="card w-full h-full glass relative py-6">
      <div v-if="weatherData" class="weather-info relative">
        <h2 class="text-xl flex w-full justify-center ">Cloudiness:</h2>
      </div>
  
         <div class="flex justify-center items-center text-3xl w-full h-full ">
          <Vue3AutoCounter :startAmount="0" :endAmount="props.weatherData?.current?.cloud" :duration="3" suffix="%" :autoinit="true" />

      </div>
    </div>
  </template>
  
  
 