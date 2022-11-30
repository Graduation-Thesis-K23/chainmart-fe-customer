import React from "react";
import Link from "next/link";
import Image from "next/image";

import hotWordList from "~/dataSources/HotWordList";
import styles from "./HotWords.module.scss";

const HotWords = () => {
  return (
    <div className={styles["hot-words"]}>
      <div className={styles["hot-words-inner"]}>
        {hotWordList.map(({ id, text, href, icon }) => (
          <div key={id} className={styles["hot-words-item"]}>
            <Link href={href}>
              <a className={styles["hot-words-item-link"]}>
                <Image
                  src={icon}
                  alt={text}
                  width={45}
                  height={45}
                  className={styles["hot-words-item-link-icon"]}
                />
                <span className={styles["hot-words-item-link-text"]}>
                  {text}
                </span>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotWords;
