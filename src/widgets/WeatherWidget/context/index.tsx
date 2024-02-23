import React, { createContext, FC, ReactElement, useEffect, useState, useCallback } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import useGeolocation from 'react-hook-geolocation'

import { getForecastWeather } from '../api'
import { ContextType } from '../types'
import { temperature } from '../constants'

type Props = {
  children: ReactElement
}

const defaultContextValues = {
  isCurrentWeather: true,
  isFetching: false,
  errorMessage: '',
  weatherFormData: {
    cityName: 'London',
    temperatureType: temperature.celsius as keyof typeof temperature,
  },
  currentWeather: undefined,
  isCelsius: true,
}

export const WidgetContext = createContext<ContextType>({
  isCurrentWeather: defaultContextValues.isCurrentWeather,
  setIsCurrentWeather: () => undefined,
  handleToggleWeatherPage: () => undefined,
  isFetching: defaultContextValues.isFetching,
  setIsFetching: () => undefined,
  errorMessage: defaultContextValues.errorMessage,
  setErrorMessage: () => undefined,
  weatherFormData: defaultContextValues.weatherFormData,
  setWeatherFormData: () => undefined,
  currentWeather: defaultContextValues.currentWeather,
  isCelsius: defaultContextValues.isCelsius,
})

const { Provider } = WidgetContext

export const WidgetProvider: FC<Props> = ({ children }) => {
  const { latitude, longitude } = useGeolocation()

  const [isCurrentWeather, setIsCurrentWeather] = useState(defaultContextValues.isCurrentWeather)
  const [isFetching, setIsFetching] = useState(defaultContextValues.isFetching)
  const [errorMessage, setErrorMessage] = useState(defaultContextValues.errorMessage)
  const [weatherFormData, setWeatherFormData] = useState(defaultContextValues.weatherFormData)
  const [currentWeather, setCurrentWeather] = useState(defaultContextValues.currentWeather)
  const [isGeolocationFetched, setIsGeolocationFetched] = useState(false)
  const isCelsius = weatherFormData.temperatureType === temperature.celsius

  const handleFetchCurrentWeather = useCallback(
    async (cityName?: string[]) => {
      if (isFetching) {
        return
      }

      try {
        setIsFetching(true)
        const response = await getForecastWeather(cityName || weatherFormData.cityName)

        if (response?.data) {
          setCurrentWeather({
            ...response.data,
          })
          setWeatherFormData((prev) => ({ ...prev, cityName: response?.data?.location?.name }))
        }
      } catch (error: any) {
        setErrorMessage(error?.response?.data?.error || '')
      } finally {
        setIsFetching(false)
      }
    },
    [weatherFormData.cityName]
  )

  const handleToggleWeatherPage = () => setIsCurrentWeather((prev) => !prev)

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage, {
        style: {
          background: '#333',
          color: '#fff',
          boxShadow: '0.1px 0.1px 3px 1px red',
        },
      })
    }
  }, [errorMessage])

  useEffect(() => {
    if (weatherFormData.cityName) {
      handleFetchCurrentWeather()
    }
  }, [weatherFormData.cityName])

  useEffect(() => {
    if (!!latitude && !!longitude && !isGeolocationFetched) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setIsGeolocationFetched(true)
      handleFetchCurrentWeather([latitude, longitude])
    }
  }, [latitude, longitude])

  const providerValue = {
    setIsCurrentWeather,
    isCurrentWeather,
    setIsFetching,
    isFetching,
    errorMessage,
    setErrorMessage,
    weatherFormData,
    setWeatherFormData,
    currentWeather,
    isCelsius,
    handleToggleWeatherPage,
  }

  return (
    <Provider value={providerValue}>
      <Toaster />
      {children}
    </Provider>
  )
}
