import React, { memo, useMemo, useState } from "react";
import { Col, Row, Skeleton } from "antd";
import { MailOutlined, PhoneFilled } from "@ant-design/icons";
import Image from "next/image";
import classNames from "classnames";
import Link from "next/link";

import styles from "./Footer.module.scss";
import useTranslate, { useLocales } from "~/hooks/useLocales";
import logo from "~/assets/images/logo.png";
import headerTopLeft from "~/dataSources/HeaderTopLeft";
import footerList from "~/dataSources/FooterList";
import Translate from "~/components/commons/Translate";
import { toast } from "react-toastify";
import instance from "~/apis/axios-instance";
import { ErrorPayload } from "~/shared";
import { ASYNC_STATUS, useAppSelector } from "~/redux";

const Footer = () => {
  const [email, setEmail] = useState("");

  const { status } = useAppSelector((state) => state.user);
  const isLoading =
    status === ASYNC_STATUS.LOADING || status === ASYNC_STATUS.IDLE;

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

  const handleSubscriber = async () => {
    if (!email) return;

    // check email format
    const regex = /\S+@\S+\.\S+/;
    if (!regex.test(email)) {
      toast.error("Email không hợp lệ");
      return;
    }

    const result: { email: string } | ErrorPayload = await instance.post(
      "/api/subscribers",
      { email }
    );

    console.log(result);

    if ("message" in result) {
      toast.error("Email đã đăng ký");
      return;
    } else {
      toast.success("Đã đăng ký thành công");
      setEmail("");
    }
  };

  return (
    <footer className={styles["footer"]}>
      {isLoading ? (
        <div
          style={{
            height: 90,
            overflow: "hidden",
          }}
        >
          <Skeleton.Input active block />
          <Skeleton.Input active block />
          <Skeleton.Input active block />
        </div>
      ) : (
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  className={styles["footer_banner_button"]}
                  onClick={handleSubscriber}
                >
                  {subscribeButtonText}
                </button>
              </Col>
            </Row>
          </div>
        </section>
      )}

      <section
        className={classNames(styles["footer_top"], styles["container"])}
      >
        <div className={styles["footer_top_logo"]}>
          {isLoading ? (
            <Skeleton.Input active size="large" />
          ) : (
            <Image
              src={logo}
              alt="footer-logo"
              width={161}
              height={51}
              priority
            />
          )}

          {isLoading ? (
            <div
              style={{
                width: 400,
                marginTop: 10,
              }}
            >
              <Skeleton.Input active size="small" block />
            </div>
          ) : (
            <span className={styles["footer_top_logo_text"]}>
              <Translate textKey="slogan.title" />
            </span>
          )}
        </div>
        <div className={classNames("ver-divider", styles["divider"])} />
        <div className={styles["footer_top_social_media"]}>
          {isLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: 200,
                marginTop: 10,
              }}
            >
              <Skeleton.Avatar active />
              <Skeleton.Avatar active />
              <Skeleton.Avatar active />
              <Skeleton.Avatar active />
            </div>
          ) : (
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
          )}
        </div>
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                style={{
                  display: "inline-block",
                  height: 150,
                  marginTop: 10,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: 180,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      marginBottom: 6,
                    }}
                  >
                    <Skeleton.Input active block />
                  </div>
                  <Skeleton.Input
                    style={{
                      marginBottom: 6,
                    }}
                    active
                    block
                    size="small"
                  />
                  <Skeleton.Input
                    style={{
                      marginBottom: 6,
                    }}
                    active
                    block
                    size="small"
                  />
                  <Skeleton.Input
                    style={{
                      marginBottom: 6,
                    }}
                    active
                    block
                    size="small"
                  />
                  <Skeleton.Input active block size="small" />
                </div>
              </div>
            ))}
          </div>
        ) : (
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
              <span className={styles["footer_support_text"]}>
                Hotline 24/7
              </span>
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
        )}
      </section>
      {isLoading ? (
        <div
          style={{
            height: 40,
            overflow: "hidden",
          }}
        >
          <Skeleton.Input active size="large" block />
          <Skeleton.Input active size="large" block />
        </div>
      ) : (
        <section className={styles["footer_bot"]}>
          <span>
            Copyright © 2023 <b>Chainmart Vietnam</b>
          </span>
        </section>
      )}
    </footer>
  );
};

export default memo(Footer);
