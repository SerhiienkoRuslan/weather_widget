import React from 'react'

import useTheme from '../../../../../hooks/useTheme'

import { ForecastDayType } from '../../../types'
import style from './styles.module.css'

type PropsType = {
  forecastDay: ForecastDayType
  onSelect: any
  tempType: boolean
  active: boolean
}

const ForecastDay: React.FC<PropsType> = ({ onSelect, active, forecastDay, tempType }) => {
  const { addTheme } = useTheme(style.light)

  const goToOnSelected = () => {
    onSelect()
  }

  return (
    <div className={active ? `${style.forecastDay} ${style.active}` : style.forecastDay}>
      <div className={addTheme(style.forecastDayItem)}>
        <div className={addTheme(style.forecastDate)}>{forecastDay.date}</div>

        <div className={addTheme(`${style.forecastMaxTemp} ${style.forecastItem}`)}>
          <div className={addTheme(style.forecastTitle)}>Max:</div>
          <div className={style.forecastText}>
            {tempType ? forecastDay.day.maxtemp_c + ' °C' : forecastDay.day.maxtemp_f + ' °F'}
          </div>
        </div>

        <div className={addTheme(`${style.forecastMinTemp} ${style.forecastItem}`)}>
          <div className={addTheme(style.forecastTitle)}>Min:</div>
          <div className={style.forecastText}>
            {tempType ? forecastDay.day.mintemp_c + ' °C' : forecastDay.day.mintemp_f + ' °F'}
          </div>
        </div>

        <div className={addTheme(`${style.chanceOfRain} ${style.forecastItem}`)}>
          <div className={addTheme(style.forecastTitle)}>Chance of rain: </div>
          <div className={style.forecastText}>{forecastDay.day.daily_chance_of_rain + ' %'}</div>
        </div>

        <div className={addTheme(`${style.sunrise} ${style.forecastItem}`)}>
          <div className={addTheme(style.forecastTitle)}>Sunrise: </div>
          <div className={style.forecastText}>{forecastDay.astro.sunrise}</div>
        </div>

        <div className={addTheme(`${style.sunset} ${style.forecastItem}`)}>
          <div className={addTheme(style.forecastTitle)}>Sunset: </div>
          <div className={style.forecastText}>{forecastDay.astro.sunset}</div>
        </div>

        <div className={addTheme(style.buttonDetails)}>
          <button onClick={goToOnSelected}>Details</button>
        </div>
      </div>
    </div>
  )
}

export default ForecastDay
