import React, { memo, useMemo } from "react";
import { Col, Row } from "antd";
import { MailOutlined, PhoneFilled } from "@ant-design/icons";
import Image from "next/image";
import classNames from "classnames";
import Link from "next/link";

import styles from "./Footer.module.scss";
import useTranslate, { useLocales } from "~/hooks/useLocales";
import logo from "~/assets/images/logo.png";
import headerTopLeft from "~/dataSources/HeaderTopLeft";
import footerList from "~/dataSources/FooterList";

const Footer = () => {
  const { local } = useLocales();
  const subscribeText = useTranslate("footer.subscribe");
  const subscribeButtonText = useTranslate("footer.subscribeButton");
  const locationText = useTranslate("footer.location");
  const customerServicesText = useTranslate("footer.customer_services");
  const aboutUsText = useTranslate("footer.about_us");
  const supportCenterText = useTranslate("footer.support_center");

  const { customer_services, about_us, support_center } = useMemo(() => {
    return footerList[local as keyof typeof footerList];
  }, [local]);

  return (
    <footer className={styles["footer"]}>
      <section className={styles["footer_banner"]}>
        <div className={styles["container"]}>
          <Row>
            <Col
              className={styles["footer_banner_group"]}
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
            >
              <MailOutlined className={styles["footer_banner_icon"]} />
              <span className={styles["footer_banner_text"]}>
                {subscribeText}
              </span>
            </Col>
            <Col
              className={styles["footer_banner_group"]}
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
            >
              <input
                className={styles["footer_banner_input"]}
                type="email"
                placeholder="email@example.com"
              />
              <button className={styles["footer_banner_button"]}>
                {subscribeButtonText}
              </button>
            </Col>
          </Row>
        </div>
      </section>
      <section
        className={classNames(styles["footer_top"], styles["container"])}
      >
        <div className={styles["footer_top_logo"]}>
          <Image
            src={logo}
            alt="footer-logo"
            width={161}
            height={51}
            priority
          />
          <span className={styles["footer_top_logo_text"]}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi
            alias repellat laudantium eum culpa at error aspernatur.
          </span>
        </div>
        <div className={classNames("ver-divider", styles["divider"])} />
        <div className={styles["footer_top_social_media"]}>
          <ul className={styles["footer_top_social_media_list"]}>
            {headerTopLeft.map((item) => (
              <li
                key={item.key}
                className={styles["footer_top_social_media_list_item"]}
              >
                <Link
                  href={item.href}
                  prefetch={false}
                  className={styles["footer_top_social_media_list_item_link"]}
                >
                  <Image
                    className={
                      styles["footer_top_social_media_list_item_link_image"]
                    }
                    src={item.icon}
                    alt="icon"
                    width={16}
                    height={16}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Row className={styles["footer_top_section"]}>
          <Col xs={24} sm={12} md={6} lg={6} xl={6}>
            <h3 className={styles["footer_top_section_title"]}>
              {customerServicesText}
            </h3>
            <ul className={styles["footer_top_section_list"]}>
              {customer_services.map(({ key, href, text }) => (
                <li key={key} className={styles["footer_top_section_item"]}>
                  <Link
                    href={href}
                    prefetch={false}
                    className={styles["footer_top_section_item_text"]}
                    aria-label={text}
                  >
                    <span>{text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Col>
          <Col xs={24} sm={12} md={6} lg={6} xl={6}>
            <h3 className={styles["footer_top_section_title"]}>
              {aboutUsText}
            </h3>
            <ul className={styles["footer-about-us-list"]}>
              {about_us.map(({ key, text, href }) => (
                <li key={key} className={styles["footer_top_section_item"]}>
                  <Link
                    href={href}
                    prefetch={false}
                    className={styles["footer_top_section_item_text"]}
                    aria-label={text}
                  >
                    <span>{text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Col>
          <Col xs={24} sm={12} md={6} lg={6} xl={6}>
            <h3 className={styles["footer_top_section_title"]}>
              {supportCenterText}
            </h3>
            <ul className={styles["footer-about-us-list"]}>
              {support_center.map(({ key, text, href }) => (
                <li key={key} className={styles["footer_top_section_item"]}>
                  <Link
                    href={href}
                    prefetch={false}
                    className={styles["footer_top_section_item_text"]}
                    aria-label={text}
                  >
                    <span>{text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Col>
          <Col xs={24} sm={12} md={6} lg={6} xl={6}>
            <div className={styles["footer_support_logo"]}>
              <PhoneFilled
                style={{
                  fontSize: "14px",
                  color: "#fff",
                }}
                rotate={90}
              />
            </div>
            <span className={styles["footer_support_text"]}>Hotline 24/7</span>
            <Link
              href="tel:+84984526014"
              aria-label="Gọi điện"
              className={styles["footer_support_phone"]}
            >
              <span>(+84) 98 4526 014</span>
            </Link>
            <div className={styles["footer_support_location"]}>
              <span className={styles["footer_support_location_text"]}>
                {locationText}
              </span>
            </div>
          </Col>
        </Row>
      </section>
      <section className={styles["footer_bot"]}>
        <span>
          Copyright © 2023 <b>Chainmart Vietnam</b>
        </span>
      </section>
    </footer>
  );
};

export default memo(Footer);
