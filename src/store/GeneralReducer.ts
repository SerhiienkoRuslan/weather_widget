import { createSlice } from "@reduxjs/toolkit";
import { ErrorType } from "../types/types";

const generalSlice = createSlice({
  name: "general",
  initialState: {
    isFetching: false,
    error: null as ErrorType | null,
    cityName: "London" as string | number[],
    tempSelect: true,
    theme: false,
  },
  reducers: {
    setError(state, action) {
      state.error = action.payload;
    },
    updateCityNameAC(state, action) {
      state.cityName = action.payload;
    },
    updateCityNameWithCoordinates(state, action) {
      state.cityName = action.payload;
    },
    updateTempTypeAC(state, action) {
      state.tempSelect = action.payload;
    },
    toggleIsFetching(state, action) {
      state.isFetching = action.payload;
    },
    changeTheme(state, action) {
      state.theme = action.payload;
    },
  },
});

export default generalSlice.reducer;
export const {
  setError,
  updateCityNameAC,
  updateCityNameWithCoordinates,
  updateTempTypeAC,
  toggleIsFetching,
  changeTheme,
} = generalSlice.actions;
