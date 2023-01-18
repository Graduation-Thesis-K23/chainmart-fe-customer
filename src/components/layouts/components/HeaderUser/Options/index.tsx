import React, { memo } from "react";
import Link from "next/link";

import { default as translate } from "~/hooks/useTranslate";

const Options: React.FC<{
  href: string;
  optionKey: string;
}> = ({ href, optionKey }) => {
  return (
    <Link href={href} prefetch={false}>
      <a>
        <span>{translate(optionKey)}</span>
      </a>
    </Link>
  );
};

export default memo(Options);
