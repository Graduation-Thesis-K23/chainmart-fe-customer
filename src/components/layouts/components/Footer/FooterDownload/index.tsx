import React, { useContext } from "react";
import Image from "next/image";

import Title from "~layouts/atomics/Title";
import vietnamFlag from "~/assets/languages/vietnam-flag-icon.svg";
import unitedFlag from "~/assets/languages/united-kingdom-flag-icon.svg";

import { default as translate } from "~/hooks/useTranslate";
import styles from "./FooterDownload.module.scss";
import { LocalesContext } from "~/hooks/useLocales";

const FooterDownload = () => {
  const { local, setLocal } = useContext(LocalesContext);

  const handleChangeLanguage = (key: string) => {
    if (local === key) {
      return;
    }
    setLocal(key);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles["footer-download"]}>
      <Title text={translate("footer.download.title")} />
      <div>
        <div
          className={styles["footer-download-flag"]}
          onClick={() => handleChangeLanguage("vi")}
        >
          <Image src={vietnamFlag} alt="vietnam-flag" width={55} height={38} />
        </div>
        <div
          className={styles["footer-download-flag"]}
          onClick={() => handleChangeLanguage("en")}
        >
          <Image src={unitedFlag} alt="united-flag" width={55} height={38} />
        </div>
      </div>
    </div>
  );
};

export default FooterDownload;
