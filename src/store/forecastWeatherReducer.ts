import { getForecastWeather } from "../api/api";
import { AppStateType, InferActionsTypes } from "./store";
import { ThunkAction } from "redux-thunk";
import {
  ErrorType,
  ForecastDayType,
  ForecastWeatherDataType,
} from "../types/types";

let initialState = {
  isFetching: false,
  error: null as ErrorType | null,
  cityName: "London" as string | number[],
  tempSelect: true,
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
};

export type InitialStateType = typeof initialState;

export const forecastWeatherReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "cw/SET_FORECAST_WEATHER": {
      return {
        ...state,
        forecastWeatherData: action.forecastWeatherData,
      };
    }
    case "cw/TOGGLE_IS_FETCHING": {
      return {
        ...state,
        isFetching: action.isFetching,
      };
    }
    case "cw/SET_ERROR": {
      return {
        ...state,
        error: { ...action.error },
      };
    }
    case "cw/UPDATE_CITY_NAME": {
      return {
        ...state,
        cityName: action.cityName,
      };
    }
    case "cw/UPDATE_CITY_NAME_COORDINATES": {
      return {
        ...state,
        cityName: action.cityName,
      };
    }
    case "cw/UPDATE_TEMP_TYPE": {
      return {
        ...state,
        tempSelect: action.tempSelect,
      };
    }
    default:
      return state;
  }
};

type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
  setForecastWeather: (forecastWeatherData: ForecastWeatherDataType) =>
    ({
      type: "cw/SET_FORECAST_WEATHER",
      forecastWeatherData,
    } as const),
  setError: (error: ErrorType) =>
    ({
      type: "cw/SET_ERROR",
      error,
    } as const),

  updateCityNameAC: (cityName: string) =>
    ({
      type: "cw/UPDATE_CITY_NAME",
      cityName,
    } as const),
  updateCityNameWithCoordinates: (cityName: number[]) =>
    ({
      type: "cw/UPDATE_CITY_NAME_COORDINATES",
      cityName,
    } as const),
  updateTempTypeAC: (tempSelect: boolean) =>
    ({
      type: "cw/UPDATE_TEMP_TYPE",
      tempSelect,
    } as const),
  toggleIsFetching: (isFetching: boolean) =>
    ({
      type: "cw/TOGGLE_IS_FETCHING",
      isFetching,
    } as const),
};

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
      dispatch(actions.toggleIsFetching(true));
      let response = await getForecastWeather(cityName);
      dispatch(actions.toggleIsFetching(false));
      dispatch(actions.setForecastWeather(response.data));
    } catch (error: any) {
      dispatch(actions.setError(error.response.data.error));
    }
  };
