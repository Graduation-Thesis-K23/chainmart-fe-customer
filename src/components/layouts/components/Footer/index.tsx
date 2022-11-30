import React from "react";

import FooterCustomerService from "./FooterCustomerService";
import FooterAboutUs from "./FooterAboutUs";
import FooterPayment from "./FooterPayment";
import FooterSocialMedia from "./FooterSocialMedia";
import FooterDownload from "./FooterDownload";

import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={styles["footer"]}>
      <div className={styles["footer-inner"]}>
        <FooterCustomerService />
        <FooterAboutUs />
        <FooterPayment />
        <FooterSocialMedia />
        <FooterDownload />
      </div>
    </div>
  );
};

export default Footer;
