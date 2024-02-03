import { fetchWeather } from './weatherService';
import type { Coords, WeatherData } from '../types';


const API_KEY = import.meta.env.VITE_APP_WEATHER_API_KEY;

export const handleAutocompleteSelect = async (selectedItem: string): Promise<WeatherData | undefined> => {
  const res = await fetch(
    `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${selectedItem}&lang=en`
  );
  const selectedLocationData = await res.json() as any;


  const selectedLocation = selectedLocationData[0];
  if (!selectedLocation) {
    console.error('Geselecteerde locatie niet gevonden.');
    return undefined;
  }

  const newCoords: Coords = {
    latitude: selectedLocation.lat,
    longitude: selectedLocation.lon,
  };

  
  const weatherResponse = await fetchWeather(newCoords);
  if (!weatherResponse) {
    console.error('Weerdata niet gevonden.');
    return undefined;
  }


  return weatherResponse;
};
