import React, { useEffect, useState } from "react";
import Router from "next/router";
import { Card, Divider, Space, Typography } from "antd";
import QRCode from "react-qr-code";

import styles from "./Momo.module.scss";
import { findBankingOrder, useAppDispatch, useAppSelector } from "~/redux";
import useTranslate from "~/hooks/useLocales";
import Timer from "./Timer";

const { Text, Title, Paragraph } = Typography;

const MomoScreen = () => {
  const dispatch = useAppDispatch();
  const { currentBankingOrder } = useAppSelector((state) => state.checkout);

  const momoScanToPayText = useTranslate("momo.scanToPay");
  const momoRemainText = useTranslate("momo.remain");
  const orText = useTranslate("or");

  const [calledPush, setCalledPush] = useState(false);

  const expirationTime = currentBankingOrder?.expiration_timestamp
    ? new Date(currentBankingOrder?.expiration_timestamp)
    : null;
  console.log(expirationTime);

  const qrcodeValue =
    (global.window &&
      window?.location.host +
        `/payment?user_id=${currentBankingOrder?.user_id}`) ||
    "";

  useEffect(() => {
    async function fetchBankingOrder() {
      try {
        const response = await dispatch(findBankingOrder());
        if ("error" in response) {
          if (calledPush) {
            return; // no need to call router.push() again
          }
          Router.push("/");
          setCalledPush(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchBankingOrder();
  }, []);

  useEffect(() => {
    if (expirationTime && expirationTime < new Date()) {
      Router.push("/");
      setCalledPush(true);
    }
  }, [expirationTime]);

  return (
    <div className={styles["momo"]}>
      <Card className={styles["momo__card"]}>
        <div className={styles["momo__qr-wrapper"]}>
          <Title level={4} style={{ textAlign: "center", marginBottom: 20 }}>
            {momoScanToPayText}
          </Title>
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={qrcodeValue}
            viewBox={`0 0 256 256`}
          />
        </div>

        <Divider plain style={{ textTransform: "capitalize" }}>
          {orText}
        </Divider>

        <Paragraph copyable>{qrcodeValue}</Paragraph>

        <Space direction="horizontal" align="end">
          <Text type="secondary">{momoRemainText + ":"}</Text>
          {expirationTime && (
            <Timer
              expiryTimestamp={expirationTime}
              orderId={currentBankingOrder?.id || ""}
            />
          )}
        </Space>
      </Card>
    </div>
  );
};

export default MomoScreen;
