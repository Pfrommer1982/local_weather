const API_KEY = import.meta.env.VITE_APP_WEATHER_API_KEY;

export const fetchAutocomplete = async (searchQuery: string) => {
  if (searchQuery.trim() !== '') {
    const res = await fetch(
      `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${searchQuery}&lang=en`
    );
    const data = await res.json() as any;
    return data.map((item: any) => `${item.name}, ${item.country}`);
  } else {
    return [];
  }
};
