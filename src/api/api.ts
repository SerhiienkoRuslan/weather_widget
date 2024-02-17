import axios from "axios";

export const currentWeatherAPI = {
  getCurrentWeather(city: string | number[] | null) {
    const options = {
      method: "GET",
      url: "https://api.weatherapi.com/v1/current.json",
      params: {
        q: `${city}`,
        key: process.env.REACT_APP_API,
      },
    };
    return axios.request(options);
  },
};

export const forecastWeatherAPI = {
  getForecastWeather(city: string | number[] | null) {
    const options = {
      method: "GET",
      url: "https://api.weatherapi.com/v1/forecast.json",
      params: {
        q: `${city}`,
        key: process.env.REACT_APP_API,
        days: "14",
      },
    };
    return axios.request(options);
  },
};
