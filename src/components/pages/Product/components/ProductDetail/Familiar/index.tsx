import React from "react";

import Item from "./Item";

import useTranslate from "~/hooks/useTranslate";
import styles from "./Familiar.module.scss";
import useProductDetail from "~/contexts/ProductDetailContext";

const Familiar = () => {
  const familiarText = useTranslate("product.familiar");
  const { image, familiar } = useProductDetail().productDetail;

  return (
    <>
      {image && (
        <div className={styles["familiar"]}>
          <div className={styles["familiar-title"]}>{familiarText}</div>
          <ul className={styles["familiar-list"]}>
            {familiar.map((item) => (
              <li key={item.id}>
                <Item item={item} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Familiar;
