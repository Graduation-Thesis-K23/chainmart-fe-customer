import React, { useCallback, useEffect, useState } from "react";
import { Menu } from "antd";
import {
  ProfileOutlined,
  UnlockOutlined,
  PartitionOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd/es/menu";

import ProfileSettings from "./components/ProfileSettings";
import AccountsConnect from "./components/AccountsConnect";
import MenuItem from "./components/MenuItem";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: 1,
    icon: <ProfileOutlined />,
    label: <MenuItem label="settings.profile" />,
  },
  {
    key: 2,
    icon: <PartitionOutlined />,
    label: <MenuItem label="settings.connectAccounts" />,
  },
  {
    key: 3,
    icon: <UnlockOutlined />,
    label: <MenuItem label="settings.changePassword" />,
  },
];

const Setting = () => {
  const [collapsed, setCollapsed] = useState<boolean>(true);

  const onClick: MenuProps["onClick"] = (e) => {
    console.log(e);
  };

  const onResize = useCallback(() => {
    if (window.innerWidth < 1200 && !collapsed) {
      setCollapsed(true);
    } else if (window.innerWidth > 1200 && collapsed) {
      setCollapsed(false);
    }
  }, [collapsed]);

  useEffect(() => {
    if (window.innerWidth < 1200) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [onResize]);

  return (
    <>
      <Menu
        style={{ width: collapsed ? 56 : 256, height: "100%", border: "none" }}
        onClick={onClick}
        inlineCollapsed={collapsed}
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={items}
      />
      <div
        style={{
          position: "absolute",
          top: 64,
          left: collapsed ? 56 : 256,
          width: collapsed ? "calc(100vw - 56px)" : "calc(100vw - 256px)",
          padding: 16,
          backgroundColor: "#f2f5fc",
          borderTopLeftRadius: "8px",
        }}
      >
        <ProfileSettings />
        <AccountsConnect />
      </div>
    </>
  );
};
export default Setting;
