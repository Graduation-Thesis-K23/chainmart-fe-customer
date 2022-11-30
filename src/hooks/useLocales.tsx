// libs
import React, { useMemo, createContext, ReactElement } from "react";
// hooks
import useLocalStorage from "./useLocalStorage";
// others
import locales from "../locales";

interface Locales {
  local: string;
  setLocal: (local: string) => void;
  locales: object;
}

export const LocalesContext = createContext<Locales>({
  local: "en",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setLocal: () => {},
  locales: {},
});

export const LocalesProvider: React.FC<{
  children: ReactElement;
}> = ({ children }) => {
  const [local, setLocal] = useLocalStorage("lang", "vi");

  const value: Locales = useMemo(
    () => ({
      local,
      setLocal,
      locales: locales[local as keyof typeof locales],
    }),
    [local, setLocal]
  );

  return (
    <LocalesContext.Provider value={value}>{children}</LocalesContext.Provider>
  );
};

export default {
  LocalesContext,
  LocalesProvider,
};
