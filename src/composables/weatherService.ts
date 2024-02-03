import type { Coords, WeatherData } from '../types';

const API_KEY = import.meta.env.VITE_APP_WEATHER_API_KEY;

export const fetchWeather = async (coords: Coords): Promise<WeatherData> => {
  const { latitude, longitude } = coords;
  const q = `${latitude},${longitude}`;
  const res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${q}&lang=en&days=3`
  );
  const responseData = await res.json() as any;

  const conditionCode = responseData.current.condition.icon;
  responseData.current.conditionCode = conditionCode;
  responseData.current.is_day = responseData.current.is_day === 1;


  return responseData;
};


