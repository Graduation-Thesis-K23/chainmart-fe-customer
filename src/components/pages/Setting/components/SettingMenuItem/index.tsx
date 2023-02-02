import React, { memo } from "react";

import useTranslate from "~/hooks/useLocales";

const MenuItem: React.FC<{
  label: string;
}> = ({ label }) => <span>{useTranslate(label)}</span>;

export default memo(MenuItem);
