import React, { memo } from "react";

import { useLocales } from "~/hooks/useLocales";

const TopRightLanguageItem: React.FC<{
  languageKey: string;
  text: string;
}> = ({ languageKey, text }) => {
  const { local, setLocal } = useLocales();

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
