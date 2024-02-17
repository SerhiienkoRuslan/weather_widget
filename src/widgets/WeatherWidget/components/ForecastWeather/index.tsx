import React, { useState, FC, useContext } from 'react'

import useTheme from '../../../../hooks/useTheme'

import { WidgetContext } from '../../context'
import { ForecastDayType } from '../../types'
import { temperature } from '../../constants'

import ForecastDay from './ForecastDay'
import WeatherDay from './WeatherDay'
import style from './styles.module.css'

const ForecastWeather: FC = () => {
  const { addTheme } = useTheme(style.light)
  const { currentWeather, weatherFormData, setIsCurrentWeather } = useContext(WidgetContext)
  const [day, setDay] = useState('')
  const [active, setActive] = useState(false)

  const forecastWeather = currentWeather?.forecast
  const currentForecastDay = forecastWeather?.forecastday || []
  const currentDay = currentForecastDay.filter((item) => item.date === day)

  const handleClickOnSelect = (fd: ForecastDayType) => {
    setDay(fd.date)
    if (day !== fd.date && !active) {
      setActive(true)
    } else if (day === fd.date) {
      setActive((prev) => !prev)
    }
  }

  const handleChangePage = () => setIsCurrentWeather(true)

  return (
    <>
      <div className={style.buttonGo}>
        <button type='button' className={addTheme(style.navlink)} onClick={handleChangePage}>
          {'< Current Weather'}
        </button>
      </div>

      <div className={style.info}>
        <div className={style.infoLocation}>
          <div className={style.locationName}>{currentWeather?.location?.name || ''}</div>

          <div className={style.locationCountryRegion}>
            <div>{currentWeather?.location?.region || ''}</div>
            <div>{currentWeather?.location?.country || ''}</div>
          </div>

          <div className={style.locationLocalTime}>Localtime: {currentWeather?.location?.localtime || ''}</div>
        </div>

        <div className={style.forecastDay}>
          {(currentWeather?.forecast?.forecastday || []).map((fd) => (
            <ForecastDay
              key={fd.date}
              forecastDay={fd}
              onSelect={() => {
                handleClickOnSelect(fd)
              }}
              tempType={weatherFormData.temperatureType === temperature.celsius}
              active={day === fd.date && active}
            />
          ))}
        </div>

        <div className={style.carrousel}>
          <article className={style.card}>
            {active &&
              currentDay.map((cd) => (
                <WeatherDay
                  infoDay={cd.hour}
                  key={cd.date}
                  tempType={weatherFormData.temperatureType === temperature.celsius}
                />
              ))}
          </article>
        </div>

        <div className={style.lastUpdate}>Last update: {currentWeather?.current?.last_updated || ''}</div>
      </div>
    </>
  )
}

export default ForecastWeather
