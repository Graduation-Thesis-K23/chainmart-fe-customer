import React, { memo } from "react";
import Link from "next/link";

import { default as translate } from "~/hooks/useLocales";

const Options: React.FC<{
  href: string;
  optionKey: string;
}> = ({ href, optionKey }) => {
  return (
    <Link href={href} prefetch={false}>
      <span>{translate(optionKey)}</span>
    </Link>
  );
};

export default memo(Options);
