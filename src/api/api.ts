import axios from "axios";

export const getCurrentWeather = (city: string | number[] | null) => {
  const options = {
    method: "GET",
    url: "https://api.weatherapi.com/v1/current.json",
    params: {
      q: `${city}`,
      key: process.env.REACT_APP_API,
    },
  };

  return axios.request(options);
}

export const getForecastWeather = (city: string | number[] | null, days = "14") => {
  const options = {
    method: "GET",
    url: "https://api.weatherapi.com/v1/forecast.json",
    params: {
      q: `${city}`,
      key: process.env.REACT_APP_API,
      days,
    },
  };

  return axios.request(options);
}
