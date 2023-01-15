import React from "react";
import Image from "next/image";

import Title from "~/components/atomics/Title";

import paymentList from "~/dataSources/PaymentList";
import { default as translate } from "~/hooks/useTranslate";
import styles from "./FooterPayment.module.scss";

const FooterPayment = () => {
  return (
    <div className={styles["footer-payment"]}>
      <Title text={translate("footer.payment.title")} />
      <div className={styles["footer-payment-list"]}>
        {paymentList.map(({ key, src }) => (
          <div key={key} className={styles["footer-payment-item"]}>
            <Image src={src} alt="payment" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FooterPayment;
