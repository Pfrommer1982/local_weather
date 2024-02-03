<script setup lang="ts">
import { defineProps, ref, onMounted, watch } from 'vue';
import { fetchUnsplashImage } from '../composables/unsplashApi';


const props = defineProps(['weatherData']);
const ConditionCode = ref<number>(0);

watch(() => props.weatherData, async (newWeatherData) => {
  if (newWeatherData) {
    ConditionCode.value = newWeatherData.current.condition.code;
    updateBackground();
  }
});

const mapConditionToUnsplashKeyword = (ConditionCode: number, is_day: boolean) => {
  switch (ConditionCode) {
    case 1000:
      
      return is_day ? "sunshine light" : "Clear night moon";
    case 1003:
      return is_day ? "sky clouds" : "night sky clouds";
    case 1006:
    case 1030:
      return is_day ? "grey cloud sky" : "dark clouds night"
    case 1009:
    case 1135:
      return is_day ? "grey clouds" : "grey dark night"
    case 1063:
    case 1150:
    case 1153:
      return is_day ? "Light rain" : "Light rain night"
    case 1066:
    case 1114:
    case 1210:
    case 1213:
    case 1069:
    case 1171:
    case 1180:
    case 1183:
    case 1186:
    case 1192:
    case 1216:
    case 1219:
    case 1222:
      return is_day ? "rain" : "rain night"

    case 1072:
      return is_day ? "freezing drizzle" : "freezing night rain"
    case 1087:
    case 1273:
      return is_day ? "Thunder lighting rain" : "Thunder lighting rain night"
    case 1147:
      return is_day ? "Freezing fog" : "cold fog night"
    case 1168:
    case 1198:
      return is_day ? "hail" : "hail night"
    case 1201:
    case 1204:
      return is_day ? "Freezing rain" : "hail night"
    case 1207:
    case 1252:
      return is_day ? "Sleet" : " sleet night"
    case 1117:
    case 1225:
      return is_day ? "Snowstorm" : "night snowstorm"
    case 1237:
    case 1261:
      return is_day ? "Ice pellets" : "night hail"
    case 1240:
    case 1243:
    case 1246:
      return is_day ? "Rain shower" : "night rain"
    case 1249:
    case 1258:
      return is_day ? "Sleet showers" : "night sleet"
    case 1255:
      return is_day ? "Snow showers" : "night snow"
    case 1264:
      return is_day ? "Showers of ice pellets" : "night snow"
    case 1276:
      return is_day ? "Thunderstorm with rain" : "night lightning rain"
    case 1282:
      return is_day ? "Thunderstorm with snow" : "blizzard night lightning"
 
    default:
      return "";
  }
};



const DynamicBG = async (ConditionCode: number) => {
  try {
    const unsplashQuery = mapConditionToUnsplashKeyword(ConditionCode, true)
    const imageUrl = await fetchUnsplashImage(unsplashQuery);
  
    return imageUrl;
  } catch (error) {
    console.error('Error fetching image:', error);
    return '';
  }
};

const imgURL = ref('default url');

const updateBackground = async () => {
  DynamicBG(ConditionCode.value).then(res => imgURL.value = res);
};

onMounted(() => {
  updateBackground();
});

</script>

<template>
  <div v-if="weatherData">
    <div :style="{ backgroundImage: `url(${imgURL})` }" class="flex fixed inset-0 bg-cover bg-center h-full z-[-1]">

    </div>
  </div>
</template>
  