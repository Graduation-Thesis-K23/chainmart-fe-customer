import React from "react";
import Router from "next/router";
import { Button, Typography } from "antd";
import { ArrowRightOutlined, SmileTwoTone } from "@ant-design/icons";

import useTranslate from "~/hooks/useLocales";

const { Title } = Typography;

export const SuccessBanking = () => {
  const momoSuccessText = useTranslate("momo.success");
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
      <SmileTwoTone
        twoToneColor="#52c41a"
        style={{
          fontSize: 100,
          display: "block",
          marginBottom: 20,
        }}
      />
      <Title level={5} style={{ textAlign: "center" }}>
        {momoSuccessText}
      </Title>

      <Button
        type="link"
        onClick={() => Router.push("/purchase")}
        icon={<ArrowRightOutlined />}
      >
        {momoReturnText}
      </Button>
    </div>
  );
};
