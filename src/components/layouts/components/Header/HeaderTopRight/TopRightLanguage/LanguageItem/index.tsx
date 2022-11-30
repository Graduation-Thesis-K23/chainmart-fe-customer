// libs
import React, { memo, useContext } from "react";
// hooks
import { LocalesContext } from "~/hooks/useLocales";

interface Props {
  languageKey: string;
  text: string;
}

const TopRightLanguageItem = ({ languageKey, text }: Props) => {
  const { setLocal } = useContext(LocalesContext);
  return <div onClick={() => setLocal(languageKey)}>{text}</div>;
};

export default memo(TopRightLanguageItem);
