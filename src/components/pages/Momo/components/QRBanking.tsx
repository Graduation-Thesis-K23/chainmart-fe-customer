import React, { FC } from "react";
import { Divider, Space, Typography } from "antd";
import QRCode from "react-qr-code";

import styles from "../Momo.module.scss";
import useTranslate from "~/hooks/useLocales";

const { Text, Title, Paragraph } = Typography;

interface QRBankingProps {
  qrcodeValue: string;
}

export const QRBanking: FC<QRBankingProps> = ({ qrcodeValue }) => {
  const momoScanToPayText = useTranslate("momo.scanToPay");
  const momoOrText = useTranslate("momo.or");

  return (
    <>
      <div className={styles["momo__qr-wrapper"]}>
        <Title level={5} style={{ marginBottom: 20 }}>
          {momoScanToPayText}
        </Title>
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={qrcodeValue}
          viewBox={`0 0 256 256`}
        />
      </div>
      <Divider plain>{momoOrText}</Divider>

      <Space direction="horizontal">
        <Text style={{ wordBreak: "keep-all" }}>Link: </Text>
        <Paragraph copyable style={{ margin: 0 }}>
          {qrcodeValue}
        </Paragraph>
      </Space>
    </>
  );
};
