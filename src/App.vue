<script setup lang="ts">
import WindRichting from './components/WindRichting.vue';
import WeatherNow from './components/WeatherNow.vue';
import SearchBar from './components/SearchBar.vue';
import WeatherForecast from './components/WeatherForecast.vue';
import WeatherToday from './components/WeatherToday.vue';
import WeatherBackground from './components/WeatherBackground.vue';

import { defineComponent, ref } from 'vue';

import type { WeatherData, Coords } from './types';
import { fetchWeather } from './composables/weatherService';
import HumidityMeter from './components/HumidityMeter.vue';
import VisibilityView from './components/VisibilityView.vue';
import CloudCover from './components/CloudCover.vue';
import PressureMB from './components/PressureMB.vue';

const weatherData = ref<WeatherData | null>(null);

const isDay = ref(true);

const handleWeatherSelected = (data: WeatherData) => {
  weatherData.value = data;
  isDay.value = data.current.is_day;
};
const handleWeatherDataChanged = (newWeatherData: WeatherData) => {
  handleWeatherSelected(newWeatherData);
};

const exampleCoords: Coords = {
  latitude: 51.509845,
  longitude: -0.118092,
};

fetchWeather(exampleCoords).then((data) => {
  handleWeatherSelected(data);
});
</script>


<template>
  <div class="relative h-screen w-screen overflow-x-hidden mb-8">
    <WeatherBackground :weather-data="weatherData" @weather-selected="handleWeatherSelected"
      class="fixed inset-0 w-full h-full z-0" />

    <div class="flex items-center justify-center min-h-screen relative z-10">
      <div class="main max-w-screen-xl w-full">
        <div class="flex w-full justify-center items-center mt-10 ">
          <SearchBar @weather-selected="handleWeatherSelected" />
        </div>

        <div class="mt-10 mb-2">
          <div class="grid grid-cols-1 lg:grid-cols-2 grid-rows-1 my-4 gap-4  mx-4 md:mx-40 lg:mx-40">
            <!-- Updated classes for responsive layout -->
            <WeatherNow :weather-data="weatherData" />
            <WeatherToday v-if="weatherData" :weather-data="weatherData" />
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 grid-rows-1  gap-4 mx-4 md:mx-40 lg:mx-40">
            <!-- Updated classes for responsive layout -->
            <WeatherForecast v-if="weatherData" :weather-data="weatherData" />
            <WindRichting :weather-data="weatherData" />
            <PressureMB   :weather-data="weatherData" />
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 grid-rows-1 gap-4 my-4 mx-4 md:mx-40 lg:mx-40">
            <!-- Updated classes for responsive layout -->
            <HumidityMeter :weather-data="weatherData" />
            <VisibilityView :weather-data="weatherData" />
            <CloudCover :weather-data="weatherData" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

