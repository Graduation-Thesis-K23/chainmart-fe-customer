// libs
import React from "react";
// hooks
import useLanguage from "~/hooks/useTranslate";
// others
import styles from "./SectionHeader.module.scss";

const SectionHeader: React.FC<{ topicKey: string }> = ({ topicKey }) => {
  const topic = useLanguage(topicKey);

  return (
    <div className={styles["section-header"]}>
      <span>{topic}</span>
    </div>
  );
};

export default SectionHeader;
