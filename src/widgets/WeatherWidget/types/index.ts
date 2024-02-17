import { temperature } from '../constants'

type WeatherData = {
  location: {
    name: string
    region: string
    country: string
    lat: null | number
    lon: null | number
    tz_id: string
    localtime_epoch: null | number
    localtime: string
  }
  current: {
    last_updated: string
    temp_c: null | number
    temp_f: null | number
    is_day: null | number
    condition: {
      text: string
      icon: string
      code: null | number
    }
    wind_mph: null | number
    wind_kph: null | number
    wind_degree: null | number
    wind_dir: string
    pressure_mb: null | number
    pressure_in: null | number
    precip_mm: null | number
    precip_in: null | number
    humidity: null | number
    cloud: null | number
    feelslike_c: null | number
    feelslike_f: null | number
    uv: null | number
  }
  forecast: {
    forecastday: Array<ForecastDayType>
  }
}

export type HourForecastDayType = {
  time_epoch: number
  time: string
  temp_c: number
  temp_f: number
  is_day: number
  condition: {
    text: string
    icon: string
    code: number
  }
  wind_mph: number
  wind_kph: number
  wind_degree: number
  wind_dir: string
  pressure_mb: number
  pressure_in: number
  precip_mm: number
  precip_in: number
  humidity: number
  cloud: number
  feelslike_c: number
  feelslike_f: number
  windchill_c: number
  windchill_f: number
  heatindex_c: number
  heatindex_f: number
  dewpoint_c: number
  dewpoint_f: number
  will_it_rain: number
  chance_of_rain: number
  will_it_snow: number
  chance_of_snow: number
  vis_km: number
  vis_miles: number
  gust_mph: number
  gust_kph: number
}

export type ForecastDayType = {
  date: string
  date_epoch: number
  day: {
    maxtemp_c: number
    maxtemp_f: number
    mintemp_c: number
    mintemp_f: number
    avgtemp_c: number
    avgtemp_f: number
    maxwind_mph: number
    maxwind_kph: number
    totalprecip_mm: number
    totalprecip_in: number
    avgvis_km: number
    avgvis_miles: number
    avghumidity: number
    daily_will_it_rain: number
    daily_chance_of_rain: number
    daily_will_it_snow: number
    daily_chance_of_snow: number
    condition: {
      text: string
      icon: string
      code: number
    }
  }
  astro: {
    sunrise: string
    sunset: string
    moonrise: string
    moonset: string
    moon_phase: string
    moon_illumination: string
  }
  hour: Array<HourForecastDayType>
}

export type ContextType = {
  isCurrentWeather: boolean
  setIsCurrentWeather: (value: boolean) => void
  isFetching: boolean
  setIsFetching: (value: boolean) => void
  errorMessage: string
  setErrorMessage: (value: string) => void
  weatherFormData: {
    cityName: string
    temperatureType: keyof typeof temperature
  }
  setWeatherFormData: ({
    cityName,
    temperatureType,
  }: {
    cityName: string
    temperatureType: keyof typeof temperature
  }) => void
  currentWeather?: WeatherData
  isCelsius: boolean
}
