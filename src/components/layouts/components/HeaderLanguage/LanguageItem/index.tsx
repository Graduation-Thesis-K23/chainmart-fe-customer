import React, { memo, useContext } from "react";

import { LocalesContext } from "~/hooks/useLocales";

const TopRightLanguageItem: React.FC<{
  languageKey: string;
  text: string;
}> = ({ languageKey, text }) => {
  const { setLocal } = useContext(LocalesContext);
  return (
    <div
      style={{
        width: "80px",
      }}
      onClick={() => setLocal(languageKey)}
    >
      {text}
    </div>
  );
};

export default memo(TopRightLanguageItem);
