import React, { FC, useContext } from 'react'

import useTheme from '../../../../hooks/useTheme'

import { WidgetContext } from '../../context'
import { temperature } from '../../constants'
import style from './styles.module.css'

const CurrentWeather: FC = () => {
  const { addTheme } = useTheme(style.light)
  const { currentWeather, isCelsius } = useContext(WidgetContext)

  return (
    <>
      <div className={style.info}>
        <div className={style.infoCity}>
          <h2 className={style.locationName}>{currentWeather?.location?.name || ''}</h2>
          <div>{currentWeather?.location?.region || ''}</div>
          <div>{currentWeather?.location?.country || ''}</div>
          <div className={style.localTime}>Localtime: {currentWeather?.location?.localtime || ''}</div>
        </div>

        <div className={style.infoIcon}>
          <div className={addTheme(style.currentIconItem)}>
            {currentWeather?.current?.condition?.icon && (
              <img className={style.currentIcon} src={currentWeather.current.condition.icon} alt='img' />
            )}
            <div className={style.currentIconText}>{currentWeather?.current?.condition?.text || ''}</div>
          </div>

          <div>
            <div className={addTheme(`${style.currentTemp} ${style.infoWeatherItem}`)}>
              <div className={addTheme(style.titleName)}>Temperature</div>
              <div className={style.infotext}>
                {isCelsius
                  ? (currentWeather?.current?.temp_c ?? '') + ' ' + temperature.celsius
                  : (currentWeather?.current?.temp_f ?? '') + ' ' + temperature.fahrenheit}
              </div>
            </div>

            <div className={addTheme(`${style.currentFilslike} ${style.infoWeatherItem}`)}>
              <div className={addTheme(style.titleName)}>Feels like</div>
              <div className={style.infotext}>
                {isCelsius
                  ? (currentWeather?.current?.feelslike_c ?? '') + ' ' + temperature.celsius
                  : (currentWeather?.current?.feelslike_f ?? '') + ' ' + temperature.fahrenheit}
              </div>
            </div>
          </div>
        </div>

        <div className={style.infoWeather}>
          <div className={addTheme(style.infoWeatherItem)}>
            <div className={addTheme(style.titleName)}>Cloud cover</div>
            <div className={style.infotext}>{(currentWeather?.current?.cloud || '') + ' %'}</div>
          </div>

          <div className={addTheme(style.infoWeatherItem)}>
            <div className={addTheme(style.titleName)}>Precipitation</div>
            <div className={style.infotext}>{(currentWeather?.current?.precip_mm || '') + ' mm'}</div>
          </div>

          <div className={addTheme(style.infoWeatherItem)}>
            <div className={addTheme(style.titleName)}>Humidity</div>
            <div className={style.infotext}>{(currentWeather?.current?.humidity || '') + ' %'}</div>
          </div>

          <div className={addTheme(style.infoWeatherItem)}>
            <div className={addTheme(style.titleName)}>Wind speed</div>
            <div className={style.infotext}>{(currentWeather?.current?.wind_kph || '') + ' Km/h'}</div>
          </div>

          <div className={addTheme(style.infoWeatherItem)}>
            <div className={addTheme(style.titleName)}>Pressure</div>
            <div className={style.infotext}>{(currentWeather?.current?.pressure_mb || '') + ' hPa'}</div>
          </div>
        </div>
      </div>

      <div className={style.lastUpdate}>Last update: {currentWeather?.current?.last_updated || ''}</div>
    </>
  )
}

export default CurrentWeather
