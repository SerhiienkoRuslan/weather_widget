import axios, { AxiosResponse } from 'axios'

export const getForecastWeather = (city: string | number[] | null, days = '14'): Promise<AxiosResponse<any, any>> => {
  const options = {
    method: 'GET',
    url: 'https://api.weatherapi.com/v1/forecast.json',
    params: {
      q: `${city}`,
      key: process.env.REACT_APP_API,
      days,
    },
  }

  return axios.request(options)
}
