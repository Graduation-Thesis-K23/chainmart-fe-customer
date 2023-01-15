import React from "react";
import Image from "next/image";
import Link from "next/link";

import Title from "~/components/atomics/Title";

import socialMediaList from "~/dataSources/SocialMediaList";
import styles from "./FooterSocialMedia.module.scss";
import { default as translate } from "~/hooks/useTranslate";

const SocialMedia = () => {
  return (
    <div className={styles["footer-social-media"]}>
      <Title text={translate("footer.socialMedia.title")} />
      {socialMediaList.map(({ key, href, src, text }) => (
        <Link key={key} href={href} prefetch={false}>
          <a className={styles["footer-social-media-item"]}>
            <Image src={src} alt="social-media" />
            <span className={styles["footer-social-media-item-text"]}>
              {text}
            </span>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default SocialMedia;
