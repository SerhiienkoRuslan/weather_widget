import React from "react";
import useTheme from "../../hooks/useTheme";
import { ForecastDayType } from "../../types/types";
import style from "./ForecastDay.module.css";

type PropsType = {
  forecastDay: ForecastDayType;
  onSelect: any;
  tempType: boolean;
  active: boolean;
};

export const ForecastDay: React.FC<PropsType> = React.memo((props) => {
  const goToOnSelected = () => {
    props.onSelect();
  };

  const { addTheme } = useTheme(style.light);

  return (
    <div
      className={
        props.active
          ? `${style.forecastDay} ${style.active}`
          : style.forecastDay
      }
    >
      <div className={addTheme(style.forecastDayItem)}>
        <div className={addTheme(style.forecastDate)}>
          {props.forecastDay.date}
        </div>
        <div
          className={addTheme(`${style.forecastMaxTemp} ${style.forecastItem}`)}
        >
          <div className={addTheme(style.forecastTitle)}>Max:</div>
          <div className={style.forecastText}>
            {props.tempType
              ? props.forecastDay.day.maxtemp_c + " °C"
              : props.forecastDay.day.maxtemp_f + " °F"}
          </div>
        </div>
        <div
          className={addTheme(`${style.forecastMinTemp} ${style.forecastItem}`)}
        >
          <div className={addTheme(style.forecastTitle)}>Min:</div>
          <div className={style.forecastText}>
            {props.tempType
              ? props.forecastDay.day.mintemp_c + " °C"
              : props.forecastDay.day.mintemp_f + " °F"}
          </div>
        </div>
        <div
          className={addTheme(`${style.chanceOfRain} ${style.forecastItem}`)}
        >
          <div className={addTheme(style.forecastTitle)}>Chance of rain: </div>
          <div className={style.forecastText}>
            {props.forecastDay.day.daily_chance_of_rain + " %"}
          </div>
        </div>
        <div className={addTheme(`${style.sunrise} ${style.forecastItem}`)}>
          <div className={addTheme(style.forecastTitle)}>Sunrise: </div>
          <div className={style.forecastText}>
            {props.forecastDay.astro.sunrise}
          </div>
        </div>
        <div className={addTheme(`${style.sunset} ${style.forecastItem}`)}>
          <div className={addTheme(style.forecastTitle)}>Sunset: </div>
          <div className={style.forecastText}>
            {props.forecastDay.astro.sunset}
          </div>
        </div>
        <div className={addTheme(style.buttonDetails)}>
          <button onClick={goToOnSelected}>Details</button>
        </div>
      </div>
    </div>
  );
});
