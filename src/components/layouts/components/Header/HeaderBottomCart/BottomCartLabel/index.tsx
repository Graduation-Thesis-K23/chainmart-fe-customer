// libs
import React, { memo } from "react";
// hooks
import useLanguage from "~/hooks/useTranslate";

const BottomCartLabel = () => {
  const addedRecently = useLanguage("cart.recentlyAdded");

  return <span>{addedRecently}</span>;
};

export default memo(BottomCartLabel);
