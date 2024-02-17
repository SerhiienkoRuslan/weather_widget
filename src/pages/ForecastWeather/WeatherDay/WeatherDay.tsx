import React from "react";
import useTheme from "../../../hooks/useTheme";
import { HourForecastDayType } from "../../../types/types";
import style from "./WeatherDay.module.css";

type PropsType = {
  infoDay: HourForecastDayType[];
  tempType: boolean;
};

export const WeatherDay: React.FC<PropsType> = React.memo((props) => {
  return (
    <div className={style.weatherDay}>
      {props.infoDay.map((d) => (
        <HourWeather key={d.time} hourInfo={d} tempType={props.tempType} />
      ))}
    </div>
  );
});

type HourWeatherPropsType = {
  hourInfo: HourForecastDayType;
  tempType: boolean;
};

const HourWeather: React.FC<HourWeatherPropsType> = React.memo((props) => {
  const { addTheme } = useTheme(style.light);
  return (
    <div className={addTheme(style.hourDayInfo)}>
      <div className={addTheme(style.hourTime)}>{props.hourInfo.time}</div>
      <div className={addTheme(style.hourIcon)}>
        <img src={props.hourInfo.condition.icon} alt="icon" />{" "}
        {props.hourInfo.condition.text}
      </div>
      <div className={addTheme(style.hourItem)}>
        <div className={addTheme(style.hourTitle)}>Temperature:</div>
        <div className={style.hourText}>
          {props.tempType
            ? props.hourInfo.temp_c + " °C"
            : props.hourInfo.temp_f + " °F"}
        </div>
      </div>
      <div className={addTheme(style.hourItem)}>
        <div className={addTheme(style.hourTitle)}>Feelslike:</div>
        <div className={style.hourText}>
          {props.tempType
            ? props.hourInfo.feelslike_c + " °C"
            : props.hourInfo.feelslike_f + " °F"}
        </div>
      </div>
      <div className={addTheme(style.hourItem)}>
        <div className={addTheme(style.hourTitle)}>Humidity:</div>
        <div className={style.hourText}>
          {props.hourInfo.humidity + " %"}
        </div>
      </div>
      <div className={addTheme(style.hourItem)}>
        <div className={addTheme(style.hourTitle)}>Precipitation:</div>
        <div className={style.hourText}>
          {props.hourInfo.precip_mm + " mm"}
        </div>
      </div>
      <div className={addTheme(style.hourItem)}>
        <div className={addTheme(style.hourTitle)}>Chance of rain:</div>
        <div className={style.hourText}>
          {props.hourInfo.chance_of_rain + " %"}
        </div>
      </div>
      <div className={addTheme(style.hourItem)}>
        <div className={addTheme(style.hourTitle)}>Chance of snow:</div>
        <div className={style.hourText}>
          {props.hourInfo.chance_of_snow + " %"}
        </div>
      </div>
      <div className={addTheme(style.hourItem)}>
        <div className={addTheme(style.hourTitle)}>Cloud cover:</div>
        <div className={style.hourText}>{props.hourInfo.cloud + " %"}</div>
      </div>
      <div className={addTheme(style.hourItem)}>
        <div className={addTheme(style.hourTitle)}>Pressure:</div>
        <div className={style.hourText}>
          {props.hourInfo.pressure_mb + " hPa"}
        </div>
      </div>
      <div className={addTheme(style.hourItem)}>
        <div className={addTheme(style.hourTitle)}>Wind speed:</div>
        <div className={style.hourText}>
          {props.hourInfo.wind_kph + " km/h"}
        </div>
      </div>
    </div>
  );
});
