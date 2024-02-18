import React, { FC, useContext } from 'react'

import useTheme from '../../hooks/useTheme'

import { WidgetContext, WidgetProvider } from './context'
import { CurrentWeather, ForecastWeather, Header, Preloader } from './components'
import style from './styles.module.css'

const WeatherWidgetApp = () => {
  const { addTheme } = useTheme(style.light)
  const { isCurrentWeather, isFetching, handleToggleWeatherPage } = useContext(WidgetContext)

  return (
    <div className={addTheme(style.infoWeather)}>
      {isFetching && <Preloader />}

      <Header />

      <div className={addTheme(style.infoWeatherContainer)}>
        <button type='button' className={addTheme(style.navlink)} onClick={handleToggleWeatherPage}>
          {isCurrentWeather ? '< 14-day forecast' : '< Current Weather'}
        </button>

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
