import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";
import {
  updateCityNameAC,
  updateCityNameWithCoordinates,
  updateTempTypeAC,
} from "../../store/GeneralReducer";
import style from "./Header.module.css";
import logo from "../../assets/logo.png";
import { useSelector } from "react-redux";
import { AppStateType } from "../../store/NewStore";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import useGeolocation from "react-hook-geolocation";
import { UpdateCityNameForm } from "./UpdateCityNameForm";
import { NavLink } from "react-router-dom";
import ChangerTheme from "./ChangerTheme";
import useTheme from "../../hooks/useTheme";

export const Header = React.memo(() => {
  const errorMessage = useSelector(
    (state: AppStateType) => state.general.error?.message
  );

  const dispatch = useDispatch();
  const updateCityName = (cityName: string) => {
    dispatch(updateCityNameAC(cityName) as unknown as AnyAction);
  };
  const updateCityNameCoordinates = (cityName: number[]) => {
    dispatch(updateCityNameWithCoordinates(cityName) as unknown as AnyAction);
  };
  const updateTempType = (tempSelect: boolean) => {
    dispatch(updateTempTypeAC(tempSelect) as unknown as AnyAction);
  };

  const { latitude, longitude } = useGeolocation();

  useEffect(() => {
    if (!!latitude || !!longitude) {
      updateCityNameCoordinates([latitude, longitude]);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (!!errorMessage) {
      toast.error(errorMessage, {
        style: {
          background: "#333",
          color: "#fff",
          boxShadow: "0.1px 0.1px 3px 1px red",
        },
      });
    }
  }, [errorMessage]);

  const { addTheme } = useTheme(style.light);

  return (
    <div className={addTheme(style.header)}>
      <div className={addTheme(style.logo)}>
        <Toaster />
        <NavLink className={style.logoNavlink} to={"/"}>
          <img className={style.logoImage} src={logo} alt="logo" />
          <h4>WeatherApp</h4>
        </NavLink>
      </div>
      <ChangerTheme />
      <div className={style.updateForm}>
        <UpdateCityNameForm
          updateCityName={updateCityName}
          updateTempType={updateTempType}
        />
      </div>
    </div>
  );
});
