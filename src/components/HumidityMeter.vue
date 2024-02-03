<script setup lang="ts">
import { defineProps, computed } from "vue";
import Vue3AutoCounter from "vue3-autocounter";

const props = defineProps(["weatherData"]);

const humidity = computed(() => (props.weatherData ? props.weatherData.current.humidity : 0));

const rotateDegrees = (humidity: number) => {
  const minRotation = 0;
  const maxRotation = 180;
  const range = maxRotation - minRotation;
  const percentage = humidity / 100;
  const offset = percentage * range;
  return minRotation + offset;
};
</script>


<template>
  <div class="card w-full h-full glass relative  justify-center items-center flex py-6">
    <div v-if="weatherData" class="weather-info relative">
      <h2 class="text-xl flex w-full justify-center">Humidity:</h2>
      <div class="flex justify-center items-center text-3xl w-full">
        <Vue3AutoCounter :startAmount="0" :endAmount="humidity" :duration="3" suffix="%" :autoinit="true" />
      </div>

      <div class="relative flex items-center justify-center w-full h-full">
        <div class="meter-container w-48 relative  -my-8">
          <img src="/images/H-gauge.webp" alt="H-gauge" class="opacity-60">
          <div aria-hidden="false" class="h-meter absolute inset-0 flex justify-center items-center"
            data-testid="direction" :style="{
              transform: `rotate(${rotateDegrees(humidity)}deg)`,
              transition: 'transform 3s ease-in-out',
            }">
            <img src="/images/H-meter.webp" alt="H-meter"
              class="transition-all transform duration-300 ease-in-out opacity-40" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.h-meter {
  -webkit-transition: 0.3s;
  -moz-transition: 0.3s;
  -o-transition: 0.3s;
  transition: 0.3s;
}
</style>
