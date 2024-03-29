import React, { useState, FC, useContext } from 'react'

import { WidgetContext } from '../../context'
import { ForecastDayType } from '../../types'

import ForecastDay from './ForecastDay'
import WeatherDay from './WeatherDay'
import style from './styles.module.css'

const ForecastWeather: FC = () => {
  const { currentWeather, isCelsius } = useContext(WidgetContext)
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

  return (
    <>
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
              tempType={isCelsius}
              active={day === fd.date && active}
            />
          ))}
        </div>

        <div className={style.carrousel}>
          <article className={style.card}>
            {active && currentDay.map((cd) => <WeatherDay infoDay={cd.hour} key={cd.date} tempType={isCelsius} />)}
          </article>
        </div>

        <div className={style.lastUpdate}>Last update: {currentWeather?.current?.last_updated || ''}</div>
      </div>
    </>
  )
}

export default ForecastWeather
