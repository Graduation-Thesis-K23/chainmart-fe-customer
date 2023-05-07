import React, { useCallback, useEffect, useState, useId } from "react";
import { Menu } from "antd";
import { useRouter } from "next/router";
import {
  ProfileOutlined,
  UnlockOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd/es/menu";

import ProfileSettings from "./components/ProfileSettings";
import MenuItem from "./components/MenuItem";
import MyAddress from "./components/MyAddress";
import ChangePassword from "./components/ChangePassword";
import { useAppSelector } from "~/redux";
import { ASYNC_STATUS } from "~/redux/constants";

const SMALL_MENU_WIDTH = 56;
const LARGE_MENU_WIDTH = 256;

const Setting = () => {
  const { status } = useAppSelector((state) => state.user);

  const router = useRouter();
  const [collapsed, setCollapsed] = useState<boolean>(true);

  const profileId = useId();
  const addressId = useId();
  const passwordId = useId();

  const onClick: MenuProps["onClick"] = (e) => {
    const element = document.getElementById(e.key);

    if (element) {
      window.scroll({ top: element.offsetTop - 16 });
    }
  };

  const onResize = useCallback(() => {
    if (window.innerWidth < 1200 && !collapsed) {
      setCollapsed(true);
    } else if (window.innerWidth > 1200 && collapsed) {
      setCollapsed(false);
    }
  }, [collapsed]);

  useEffect(() => {
    if (status !== ASYNC_STATUS.SUCCEED && status !== ASYNC_STATUS.LOADING) {
      router.push("/");
    }
  }, [router, status]);

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
        style={{
          position: "fixed",
          top: 64,
          left: 0,
          width: collapsed ? SMALL_MENU_WIDTH : LARGE_MENU_WIDTH,
          height: "100%",
          border: "none",
        }}
        onClick={onClick}
        inlineCollapsed={collapsed}
        mode="inline"
        defaultSelectedKeys={[profileId]}
        items={[
          {
            key: profileId,
            icon: <ProfileOutlined />,
            label: <MenuItem label="settings.profile" />,
          },
          {
            key: addressId,
            icon: <HomeOutlined />,
            label: <MenuItem label="settings.address" />,
          },
          /* {
            key: accountsId,
            icon: <PartitionOutlined />,
            label: <MenuItem label="settings.connectAccounts" />,
          }, */
          {
            key: passwordId,
            icon: <UnlockOutlined />,
            label: <MenuItem label="settings.changePassword" />,
          },
        ]}
      />
      <div
        style={{
          position: "absolute",
          top: 64,
          left: collapsed ? SMALL_MENU_WIDTH : LARGE_MENU_WIDTH,
          width: collapsed ? "calc(100vw - 56px)" : "calc(100vw - 256px)",
          padding: 16,
          backgroundColor: "#f2f5fc",
          borderTopLeftRadius: "8px",
        }}
      >
        <ProfileSettings id={profileId} />
        <MyAddress id={addressId} />
        {/* <AccountsConnect id={accountsId} /> */}
        <ChangePassword id={passwordId} />
      </div>
    </>
  );
};
export default Setting;
