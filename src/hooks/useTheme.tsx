import { useSelector } from "react-redux";
import { AppStateType } from "../store/NewStore";

const useTheme = (light: string) => {
  const theme = useSelector((state: AppStateType) => state.general.theme);

  const addTheme = (className: string) => {
    const themeClass = theme ? ` ${light}` : "";

    return className + themeClass;
  };

  return { addTheme };
};

export default useTheme;
