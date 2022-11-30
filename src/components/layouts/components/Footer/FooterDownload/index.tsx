import React from "react";
import Image from "next/image";

import Title from "~layouts/atomics/Title";

import QR from "~/assets/social-media/qr.png";
import { default as translate } from "~/hooks/useTranslate";
import styles from "./FooterDownload.module.scss";

const FooterDownload = () => {
  return (
    <div className={styles["footer-download"]}>
      <Title text={translate("footer.download.title")} />
      <Image src={QR} width={180} height={180} alt="qr" />
    </div>
  );
};

export default FooterDownload;
