<script setup lang="ts">
import { defineProps, computed } from 'vue';

const props = defineProps(['weatherData']);

const millibarsToDegrees = (pressureMb: number) => {
  const minPressure = 0;
  const maxPressure = 200;
  const minRotation = -125;
  const maxRotation = -47;

  const normalizedPressure = Math.min(Math.max(pressureMb, minPressure), maxPressure);
  const percentage = (normalizedPressure - minPressure) / (maxPressure - minPressure);
  const rotation = minRotation + percentage * (maxRotation - minRotation);

  return rotation;
};

const windStyle = computed(() => {
  if (props.weatherData && props.weatherData.current) {
    return {
      transform: `rotate(${millibarsToDegrees(props.weatherData.current.pressure_mb * 0.1)}deg)`,
    };
  } else {
    return {};
  }
});


</script>

<template>
  <div class="card w-full h-full glass  flex justify-center py-10">
    <div class="flex flex-col justify-center items-center">
      <span class="flex text-center w-full justify-center text-lg">Pressure:</span>
      <div class="compass-container w-64 scale-[1.07] relative">
        <img src="/images/kPa-gauge.webp" alt="kpa-gauge">
        <div
          aria-hidden="false"
          class="absolute inset-0 flex justify-center items-center"
          data-testid="direction"
          :style="windStyle"
        >
          <img src="/images/kPa-meter.webp" alt="kpa-meter" class="w-52 scale-[1.2]">
        </div>
      </div>
    </div>

    <div class="px-2 pt-1">
      <span class="flex text-sm px-4 justify-between w-full mt-4 border-t pt-3">
        Pressure in MilliBars
        <span v-if="props.weatherData && props.weatherData.current">
          {{ props.weatherData.current.pressure_mb }}
          <span class="text-sm"></span>
        </span>
        <span v-else>N/A</span>
      </span>

      <span class="flex text-sm px-4 justify-between w-full mt-4">
        The average pressure in kPa
      
          <span class="text-sm">101</span>
        </span>
       
      
    </div>
  </div>
</template>
