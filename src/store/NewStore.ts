import { combineReducers, configureStore } from "@reduxjs/toolkit";
import forecastSlice from "./NewForecastReducer";
import currentSlice from "./NewCurrentReducer";
import generalSlice from "./GeneralReducer";

const rootReducer = combineReducers({
  forecast: forecastSlice,
  current: currentSlice,
  general: generalSlice,
});

type RootReduserType = typeof rootReducer; // (globalstate: AppStateType) => AppStateType
export type AppStateType = ReturnType<RootReduserType>;
export type InferActionsTypes<T> = T extends {
  [key: string]: (...args: any[]) => infer U;
}
  ? U
  : never;

export const store = configureStore({
  reducer: rootReducer,
});
