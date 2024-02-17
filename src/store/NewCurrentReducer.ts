import { createSlice } from "@reduxjs/toolkit";
import { currentWeatherAPI } from "../api/api";
import { AppStateType, InferActionsTypes } from "./NewStore";
import { ThunkAction } from "redux-thunk";
import { setError, toggleIsFetching } from "./GeneralReducer";

const currentSlice = createSlice({
  name: "current",
  initialState: {
    currentWeatherData: {
      location: {
        name: "",
        region: "",
        country: "",
        lat: null as null | number,
        lon: null as null | number,
        tz_id: "",
        localtime_epoch: null as null | number,
        localtime: "",
      },
      current: {
        last_updated: "",
        temp_c: null as null | number,
        temp_f: null as null | number,
        is_day: null as null | number,
        condition: {
          text: "",
          icon: "",
          code: null as null | number,
        },
        wind_mph: null as null | number,
        wind_kph: null as null | number,
        wind_degree: null as null | number,
        wind_dir: "",
        pressure_mb: null as null | number,
        pressure_in: null as null | number,
        precip_mm: null as null | number,
        precip_in: null as null | number,
        humidity: null as null | number,
        cloud: null as null | number,
        feelslike_c: null as null | number,
        feelslike_f: null as null | number,
        uv: null as null | number,
      },
    },
  },
  reducers: {
    setCurrentWeather(state, action) {
      state.currentWeatherData = action.payload;
    },
  },
});

export default currentSlice.reducer;
export const { setCurrentWeather } = currentSlice.actions;

type ActionsTypes = InferActionsTypes<typeof currentSlice.actions>;

type ThunkType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionsTypes
>;

export const getCurrentWeatherInfo =
  (cityName: string | number[]): ThunkType =>
  async (dispatch, getState) => {
    try {
      dispatch(toggleIsFetching(true));
      let response = await currentWeatherAPI.getCurrentWeather(cityName);
      dispatch(toggleIsFetching(false));
      dispatch(currentSlice.actions.setCurrentWeather(response.data));
    } catch (error: any) {
      dispatch(toggleIsFetching(false));
      dispatch(setError(error.response.data.error));
    }
  };
