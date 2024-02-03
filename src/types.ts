export interface ForecastData {
  forecastday: Array<{
    date: string;
    day: {
      condition: {
        icon: string;
      };
      hour: {
        time_epoch: number;
        hour: number;
        time: string;
        temp_c: number;
        is_day: number;
        condition: {
          text: string;
          icon: string;
          code: number;
          hour: number;
        };
      }[];
      mintemp_c: number;
      maxtemp_c: number;
    };
    hour: {
      time_epoch: number;
      hour: number;
      time: string;
      temp_c: number;
      is_day: number;
      condition: {
        text: string;
        icon: string;
        code: number;
        hour: number;
      };
    }[];
  }>;
}

export interface WeatherData {
  location: {
    localtime: Date;
    name: string;
    region: string;
    country: string;
    latitude: number;
    longitude: number;
  };
  city: string;
  current: {
    temp_c: number;
    temp_f: number;
    precip_mm: number;
    condition: {
      text: string;
      icon: string;
      hour: number;
    };
    wind_degree: number;
    wind_kph: number;
    gust_kph: number;
    conditionCode?: string;
    is_day: boolean;
    cloud: number;
    feelslike_c: number;
    humidity: number;
    pressure_mb: number;
    precip_cm: number;
    vis_km: number;
    uv: number;
    air_quality: {
      us_epa_index: number;
    }
    hour: {
      time_epoch: number;
      hour: number;
      time: string;
      temp_c: number;
      is_day: number;
      condition: {
        text: string;
        icon: string;
        code: number;
        hour: number;
      };
    }[]; 
  };
  forecast: ForecastData;
}

export interface Coords {
  latitude: number;
  longitude: number;
}





