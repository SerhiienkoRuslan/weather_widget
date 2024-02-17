import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getForecastWeatherInfo } from "../../store/NewForecastReducer";
import { AnyAction } from "redux";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppStateType } from "../../store/NewStore";
import style from "./ForecastWeather.module.css";
import { ForecastDay } from "./ForecastDay";
import { WeatherDay } from "./WeatherDay/WeatherDay";
import { ForecastDayType } from "../../types/types";
import { Preloader } from "../../components/Preloader/Preloader";
import useTheme from "../../hooks/useTheme";

export const ForecastWeather = React.memo(() => {
  const dispatch = useDispatch();
  const getForecastWeatherData = (cityName: string | Array<number>) => {
    dispatch(getForecastWeatherInfo(cityName) as unknown as AnyAction);
  };

  const cityName = useSelector((state: AppStateType) => state.general.cityName);
  const forecastWeather = useSelector(
    (state: AppStateType) => state.forecast.forecastWeatherData
  );
  const tempType = useSelector(
    (state: AppStateType) => state.general.tempSelect
  );
  const isFetching = useSelector(
    (state: AppStateType) => state.general.isFetching
  );

  useEffect(() => {
    getForecastWeatherData(cityName);
  }, [cityName]);

  const [day, setDay] = useState("");
  const [active, setActive] = useState(false);

  const currentDay = forecastWeather.forecast.forecastday.filter(
    (item) => item.date === day
  );

  const handleClickOnSelect = (fd: ForecastDayType) => {
    setDay(fd.date);
    if (day !== fd.date && !active) {
      setActive(true);
    } else if (day === fd.date) {
      setActive((prev) => !prev);
    }
  };

  const { addTheme } = useTheme(style.light);

  return (
    <>
      {isFetching ? <Preloader /> : null}
      <div className={style.buttonGo}>
        <NavLink className={addTheme(style.navlink)} to={"/current"}>
          {"< Current Weather"}
        </NavLink>
      </div>
      <div className={style.info}>
        <div className={style.infoLocation}>
          <div className={style.locationName}>
            {forecastWeather.location.name}
          </div>
          <div className={style.locationCountryRegion}>
            <div>{forecastWeather.location.region}</div>
            <div>{forecastWeather.location.country}</div>
          </div>
          <div className={style.locationLocalTime}>
            Localtime: {forecastWeather.location.localtime}
          </div>
        </div>
        <div className={style.forecastDay}>
          {forecastWeather.forecast.forecastday.map((fd) => (
            <ForecastDay
              key={fd.date}
              forecastDay={fd}
              onSelect={() => {
                handleClickOnSelect(fd);
              }}
              tempType={tempType}
              active={day === fd.date && active}
            />
          ))}
        </div>
        <div className={style.carrousel}>
          <article className={style.card}>
            {active ? (
              currentDay.map((cd) => (
                <WeatherDay
                  infoDay={cd.hour}
                  key={cd.date}
                  tempType={tempType}
                />
              ))
            ) : (
              <div></div>
            )}
          </article>
        </div>
        <div className={style.lastUpdate}>
          Last update: {forecastWeather.current.last_updated}
        </div>
      </div>
    </>
  );
});
