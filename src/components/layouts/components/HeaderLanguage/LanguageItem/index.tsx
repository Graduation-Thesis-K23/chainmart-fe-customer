import React, { memo, useContext } from "react";

import { LocalesContext } from "~/hooks/useLocales";

const TopRightLanguageItem: React.FC<{
  languageKey: string;
  text: string;
}> = ({ languageKey, text }) => {
  const { local, setLocal } = useContext(LocalesContext);

  const handleSetLocal = () => {
    if (local === languageKey) {
      return;
    }
    setLocal(languageKey);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      style={{
        width: "80px",
      }}
      onClick={handleSetLocal}
    >
      {text}
    </div>
  );
};

export default memo(TopRightLanguageItem);
