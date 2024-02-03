<script setup lang="ts">
import { defineProps, computed } from 'vue';

const props = defineProps(['weatherData']);

const windStyle = computed(() => ({
  transform: `rotate(${props.weatherData?.current?.wind_degree || 0}deg)`,
}));
</script>

<template>
  <div class="card w-full h-full glass flex justify-center py-10">
    <div class="flex flex-col justify-center items-center">
      <span class="flex text-center w-full justify-center text-lg">Wind</span>
      <div class="compass-container w-64 relative">
        <img src="/images/compass.webp" alt="compass">
        <div aria-hidden="false" class="absolute inset-0 flex justify-center items-center" data-testid="direction" :style="windStyle">
          <img src="/images/arrow up.webp" alt="arrow" class="w-52">
        </div>
      </div>
    </div>

    <div class="px-2 pt-1">
      <span class="flex text-sm px-4 justify-between w-full mt-4 border-t pt-3">
        Wind speed
        <span v-if="props.weatherData?.current">
          {{ props.weatherData.current.wind_kph }}
          <span class="text-sm">km/h</span>
        </span>
        <span v-else>N/A</span>
      </span>

      <span class="flex text-sm px-4 justify-between w-full mt-4">
        Gust
        <span v-if="props.weatherData?.current">
          {{ props.weatherData.current.gust_kph }}
          <span class="text-sm">km/h</span>
        </span>
        <span v-else>N/A</span>
      </span>
    </div>
  </div>
</template>
