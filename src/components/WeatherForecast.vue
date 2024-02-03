<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import type { WeatherData } from '../types';
import { useDateUtils } from '../composables/formatDate';

export default defineComponent({
  name: 'WeatherForecast',
  props: {
    weatherData: {
      type: Object as PropType<WeatherData>,
      required: true,
    },
  },

  components: {},
  setup() {
    const { formatDate } = useDateUtils();

    return {
      formatDate,
    };
  },
});
</script>

<template>
  <div class="card w-full h-full glass flex justify-center items-center py-10">
    <div class="weather-forecast relative flex flex-col justify-center items-center">
      <div class="flex flex-col justify-center items-center">
        <h3 class="text-lg">3-day Weather forecast </h3>
        <h3 class="text-lg pb-4">{{ weatherData.location.name }}</h3>
      </div>
      <ul class="forecast-list px-2">
        <li v-for="(day, index) in weatherData.forecast.forecastday" :key="index" :class="{ 'border-b pb-3': index < 3 }">
          <div class="forecast-item flex px-4">
            <img :src="day.day.condition.icon" alt="Weericoon" class="w-16 mt-2" />
            <div class="flex flex-col pl-8 mt-2 text-sm">
              <span class="forecast-date">{{ formatDate(day.date) }}</span>
              <span class="forecast-temp">Min Temp: {{ day.day.mintemp_c }}°C</span>
              <span class="forecast-temp">Max Temp: {{ day.day.maxtemp_c }}°C</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>



