// libs
import { useContext, useEffect, useState } from "react";
// hooks
import { LocalesContext } from "./useLocales";

const useTranslate = (key: string) => {
  const [language, setLanguage] = useState<object>({});
  const { locales } = useContext(LocalesContext);

  useEffect(() => {
    setLanguage(locales);
  }, [locales]);

  return language[key as keyof typeof language];
};

export default useTranslate;
