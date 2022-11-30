// libs
import React, { memo } from "react";
// components
import TextLink from "~/components/atomics/TextLink";
// hooks
import useLanguage from "~/hooks/useTranslate";

interface Props {
  href: string;
  textKey: string;
}

const ProfileItem = ({ href, textKey }: Props) => (
  <TextLink href={href} text={useLanguage(textKey)} />
);

export default memo(ProfileItem);
