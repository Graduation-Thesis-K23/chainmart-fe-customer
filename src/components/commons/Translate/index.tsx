import React, { memo } from "react";

import useTranslate from "~/hooks/useLocales";

const Translate: React.FC<{
  textKey: string;
}> = ({ textKey }) => {
  const text = useTranslate(textKey);

  return <>{text}</>;
};

export default memo(Translate);
