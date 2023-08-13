import React from "react";
import Router from "next/router";
import { Button, Typography } from "antd";
import { ArrowRightOutlined, FrownTwoTone } from "@ant-design/icons";

import useTranslate from "~/hooks/useLocales";

const { Title } = Typography;

export const FailedBanking = () => {
  const momoFailedText = useTranslate("momo.failed");
  const momoReturnText = useTranslate("momo.return");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
      }}
    >
      <FrownTwoTone
        twoToneColor="#f81d22"
        style={{
          fontSize: 100,
          display: "block",
        }}
      />
      <Title level={5} style={{ textAlign: "center" }}>
        {momoFailedText}
      </Title>

      <Button
        type="link"
        onClick={() => Router.push("/")}
        icon={<ArrowRightOutlined />}
      >
        {momoReturnText}
      </Button>
    </div>
  );
};
