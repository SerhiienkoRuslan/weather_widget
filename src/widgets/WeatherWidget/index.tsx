import React, { FC, useContext } from 'react'

import { WidgetContext, WidgetProvider } from './context'
import { CurrentWeather, ForecastWeather, Header, Preloader } from './components'

const WeatherWidgetApp = () => {
  const { isCurrentWeather, isFetching } = useContext(WidgetContext)

  return (
    <div>
      <Header />

      <div>
        {isFetching && <Preloader />}
        {isCurrentWeather ? <CurrentWeather /> : <ForecastWeather />}
      </div>
    </div>
  )
}

const WeatherWidget: FC = () => {
  return (
    <WidgetProvider>
      <WeatherWidgetApp />
    </WidgetProvider>
  )
}

export default WeatherWidget
