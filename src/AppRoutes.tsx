import React from "react";
import { ForecastWeather } from "./pages/ForecastWeather/ForecastWeather";
import { CurrentWeather } from "./pages/CurrentWeather/CurrentWeather";
import { Navigate, Route, Routes } from "react-router-dom";

const AppRoutes = React.memo(() => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/current"} />} />
      <Route path="/forecast" element={<ForecastWeather />} />
      <Route path="/current" element={<CurrentWeather />} />
    </Routes>
  );
});

export default AppRoutes;
