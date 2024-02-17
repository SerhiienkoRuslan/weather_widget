import { currentWeatherAPI } from "../api/api";
import { AppStateType, InferActionsTypes } from "./store";
import { ThunkAction } from "redux-thunk";
import { CurrentWeatherDataType, ErrorType } from "../types/types";

let initialState = {
  isFetching: false,
  error: null as ErrorType | null,
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
};

export type InitialStateType = typeof initialState;

export const currentWeatherReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "cw/SET_CURRENT_WEATHER": {
      return {
        ...state,
        currentWeatherData: action.currentWeatherData,
      };
    }
    case "cw/SET_ERROR": {
      return {
        ...state,
        error: action.error,
      };
    }
    case "cw/TOGGLE_IS_FETCHING": {
      return {
        ...state,
        isFetching: action.isFetching,
      };
    }
    default:
      return state;
  }
};

type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
  setCurrentWeather: (currentWeatherData: CurrentWeatherDataType) =>
    ({
      type: "cw/SET_CURRENT_WEATHER",
      currentWeatherData,
    } as const),
  setError: (error: ErrorType) =>
    ({
      type: "cw/SET_ERROR",
      error,
    } as const),
  toggleIsFething: (isFetching: boolean) =>
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

export const getCurrentWeatherInfo =
  (cityName: string | number[]): ThunkType =>
  async (dispatch, getState) => {
    try {
      dispatch(actions.toggleIsFething(true));
      let response = await currentWeatherAPI.getCurrentWeather(cityName);
      dispatch(actions.toggleIsFething(false));
      dispatch(actions.setCurrentWeather(response.data));
    } catch (error: any) {
      dispatch(actions.setError(error.response.data.error));
    }
  };
