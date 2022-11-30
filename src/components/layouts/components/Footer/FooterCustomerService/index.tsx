import React from "react";

import Title from "~layouts/atomics/Title";
import TextLink from "~/components/atomics/TextLink";

import { default as translate } from "~/hooks/useTranslate";
import customerServiceList from "~/dataSources/CustomerServiceList";
import styles from "./FooterCustomerService.module.scss";

const FooterCustomerService = () => {
  return (
    <div className={styles["footer-customer-service"]}>
      <Title text={translate("footer.customerService.title")} />
      <ul className={styles["footer-customer-service-list"]}>
        {customerServiceList.map(({ key, titleKey, href }) => (
          <li key={key} className={styles["footer-customer-service-item"]}>
            <TextLink href={href} text={translate(titleKey)} />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default FooterCustomerService;
