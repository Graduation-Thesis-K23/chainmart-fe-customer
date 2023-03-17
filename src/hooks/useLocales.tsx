// libs
import React, { useContext, useMemo, createContext, ReactElement } from "react";
// hooks
import useLocalStorage from "./useLocalStorage";
// others
import localesData from "../locales";

interface Locales {
  local: string;
  setLocal: (local: string) => void;
  locales: object;
}

const LocalesContext = createContext<Locales>({
  local: "vi",
  setLocal: () => {},
  locales: localesData.vi,
});

export const LocalesProvider: React.FC<{
  children: ReactElement;
}> = ({ children }) => {
  const [local, setLocal] = useLocalStorage("lang", "vi");

  const value: Locales = useMemo(
    () => ({
      local,
      setLocal,
      locales: localesData[local as keyof typeof localesData],
    }),
    [local, setLocal]
  );

  return (
    <LocalesContext.Provider value={value}>{children}</LocalesContext.Provider>
  );
};

export const useLocales = () => useContext(LocalesContext);

const useTranslate = (key: string) => {
  const { locales } = useLocales();

  return locales[key as keyof typeof locales];
};

export default useTranslate;
