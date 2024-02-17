import { createSlice } from "@reduxjs/toolkit";
import { getForecastWeather } from "../api/api";
import { ForecastDayType } from "../types/types";
import { AppStateType, InferActionsTypes } from "./NewStore";
import { ThunkAction } from "redux-thunk";
import { setError, toggleIsFetching } from "./GeneralReducer";

const forecastSlice = createSlice({
  name: "forecast",
  initialState: {
    forecastWeatherData: {
      location: {
        name: "",
        region: "",
        country: "",
        lat: null as number | null,
        lon: null as number | null,
        tz_id: "",
        localtime_epoch: null as number | null,
        localtime: "",
      },
      current: {
        last_updated: "",
        temp_c: null as number | null,
        temp_f: null as number | null,
        is_day: null as number | null,
        condition: {
          text: "",
          icon: "",
          code: null as number | null,
        },
        wind_mph: null as number | null,
        wind_kph: null as number | null,
        wind_degree: null as number | null,
        wind_dir: "",
        pressure_mb: null as number | null,
        pressure_in: null as number | null,
        precip_mm: null as number | null,
        precip_in: null as number | null,
        humidity: null as number | null,
        cloud: null as number | null,
        feelslike_c: null as number | null,
        feelslike_f: null as number | null,
        uv: null as number | null,
      },
      forecast: {
        forecastday: [] as Array<ForecastDayType>,
      },
    },
  },
  reducers: {
    setForecastWeather(state, action) {
      state.forecastWeatherData = action.payload;
    },
  },
});

export default forecastSlice.reducer;
export const { setForecastWeather } = forecastSlice.actions;

type ActionsTypes = InferActionsTypes<typeof forecastSlice.actions>;

type ThunkType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionsTypes
>;

export const getForecastWeatherInfo =
  (cityName: string | Array<number>): ThunkType =>
  async (dispatch, getState) => {
    try {
      dispatch(toggleIsFetching(true));
      let response = await getForecastWeather(cityName);
      dispatch(toggleIsFetching(false));
      dispatch(forecastSlice.actions.setForecastWeather(response.data));
    } catch (error: any) {
      dispatch(toggleIsFetching(false));
      dispatch(setError(error.response.data.error));
    }
  };
