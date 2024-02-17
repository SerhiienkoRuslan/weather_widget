import React from "react";
import "./App.css";
import { Header } from "./components/Header/Header";
import AppRoutes from "./AppRoutes";
import { useSelector } from "react-redux";
import { AppStateType } from "./store/NewStore";

const App = React.memo(() => {
  const theme = useSelector((state: AppStateType) => state.general.theme);

  const addThemeLight = (className: string) => {
    const themeClassLight = theme ? " light" : "";

    return className + themeClassLight;
  };

  return (
    <div className={addThemeLight("app")}>
      <div className={addThemeLight("app-wrapper")}>
        <Header />
        <div className={addThemeLight("infoWeather")}>
          <AppRoutes />
        </div>
      </div>
    </div>
  );
});

export default App;
