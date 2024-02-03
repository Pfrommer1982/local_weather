<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue';
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

  setup(props) {
    const { formatDate } = useDateUtils();

    const startIndex = ref(0);

    const scrollNextHours = () => {
      if (startIndex.value + 8 < props.weatherData.forecast.forecastday[0].hour.length) {
        startIndex.value += 8;
      }
    };

    const scrollPrevHours = () => {
      if (startIndex.value - 8 >= 0) {
        startIndex.value -= 8;
      }
    };

    const showNextHour = () => {
      if (startIndex.value + 1 < props.weatherData.forecast.forecastday[0].hour.length) {
        startIndex.value += 1;
      }
    };

    const upcomingHours = computed(() => {
      const currentHours = props.weatherData.forecast.forecastday[0].hour;

      if (startIndex.value < 0 || startIndex.value >= currentHours.length) {
        return [];
      }

      return currentHours.slice(startIndex.value, startIndex.value + 4);
    });

    onMounted(() => {

    });

    const formatTime = (time: string) => {
      return time.split(' ')[1].split(':')[0] + ':00';
    };

    return {
      formatDate,
      startIndex,
      scrollNextHours,
      scrollPrevHours,
      showNextHour,
      upcomingHours,
      formatTime,
    };
  },
});
</script>

<template>
  <div class="card glass flex justify-center items-center h-full w-full p-6"
    v-if="weatherData && weatherData.forecast && weatherData.forecast.forecastday[0]">
    <div class="hourly-forecast items-center">
      <h3 class="text-lg text-center pb-2">Hourly Forecast for {{ weatherData.location.name }}</h3>
      <ul class="hourly-forecast-list flex px-2 mx-2 overflow-x-auto">
        <li v-for="(hour, hourIndex) in upcomingHours" :key="hourIndex"
          class="border border-white/20 rounded-lg mx-1 py-2 px-2 flex justify-center items-center">
          <div class="hourly-forecast-item text-center">
            <span class="hourly-forecast-time">{{ formatTime(hour.time) }}</span>
            <img :src="hour.condition.icon" alt="Hourly Weather Icon" class="" />
            <span class="hourly-forecast-temp ">{{ hour.temp_c }}°C</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="flex justify-between px-8 items-center w-full pt-4">
      <button class=" btn btn-xs btn-outline px-4 hover:bg-white/30" @click="scrollPrevHours"><span
          class="scale-[2] pb-[1px]">«</span></button>
      <button class="btn btn-xs btn-outline px-4 hover:bg-white/30" @click="scrollNextHours"><span
          class="scale-[2] pb-[1px]">»</span></button>
    </div>
  </div>
</template>


