import React, { memo, ReactElement } from "react";
import MultiLanguage from "~/components/commons/MultiLanguage";
import Image from "next/image";

import styles from "./AuthLayout.module.scss";
import background from "~/assets/background.jpg";

const AuthLayout: React.FC<{
  children: ReactElement;
}> = ({ children }) => (
  <div className={styles["layout"]}>
    <div className={styles["layout_background"]}>
      <Image
        className={styles["layout_background_img"]}
        src={background}
        alt="background"
        priority
        fill
      />
      <span className={styles["layout_background_overlay"]} />
    </div>
    <div className={styles["layout_language"]} id="language">
      <MultiLanguage
        container={() => document.getElementById("language") as HTMLElement}
      />
    </div>
    {children}
  </div>
);

export default memo(AuthLayout);
