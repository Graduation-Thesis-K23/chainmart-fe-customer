import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { GlobalOutlined } from "@ant-design/icons";

import MultiLanguage from "~/components/commons/MultiLanguage";

import logoSquare from "~/assets/images/logo-square.png";
import styles from "./Header.module.scss";
import { useAppSelector } from "~/redux";
import { useRouter } from "next/router";

const Header = () => {
  const user = useAppSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (user.data.username) {
      router.push("/");
    }
  }, [router, user]);

  return (
    <header className={styles["header"]}>
      <div className="container">
        <div className={styles["header-inner"]}>
          <Link href="/">
            <Image
              src={logoSquare}
              width={50}
              height={50}
              alt="logo"
              priority
            />
          </Link>
          <div className={styles["header-inner_right"]}>
            <GlobalOutlined />
            <div className={styles["header-inner_language"]} id="language">
              <MultiLanguage
                container={() =>
                  document.getElementById("language") as HTMLElement
                }
              />
            </div>
            <div className={styles["header-inner_vertical"]}></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
