import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMidlleware from "redux-thunk";
import { currentWeatherReducer } from "./currentWeatherReducer";
import { forecastWeatherReducer } from "./forecastWeatherReducer";

let rootReduser = combineReducers({
  currentWeather: currentWeatherReducer,
  forecastWeather: forecastWeatherReducer,
});

type RootReduserType = typeof rootReduser; // (globalstate: AppStateType) => AppStateType
export type AppStateType = ReturnType<RootReduserType>;
export type InferActionsTypes<T> = T extends {
  [key: string]: (...args: any[]) => infer U;
}
  ? U
  : never;

export const store = createStore(rootReduser, applyMiddleware(thunkMidlleware));
