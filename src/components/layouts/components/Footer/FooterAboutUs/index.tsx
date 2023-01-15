import React from "react";

import Title from "~/components/atomics/Title";
import TextLink from "~/components/atomics/TextLink";

import aboutUsList from "~/dataSources/AboutUsList";
import { default as translate } from "~/hooks/useTranslate";
import styles from "./FooterAboutUs.module.scss";

const FooterAboutUs = () => {
  return (
    <div className={styles["footer-about-us"]}>
      <Title text={translate("footer.aboutUs.title")} />
      <ul className={styles["footer-about-us-list"]}>
        {aboutUsList.map(({ key, titleKey, href }) => (
          <li key={key} className={styles["footer-about-us-item"]}>
            <TextLink href={href} text={translate(titleKey)} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterAboutUs;
