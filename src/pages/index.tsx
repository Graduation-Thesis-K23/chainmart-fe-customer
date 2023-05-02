import Head from "next/head";
import React from "react";
import type { NextPageWithLayout } from "./_app";
import dynamic from "next/dynamic";

import { MAIN_LAYOUT } from "~/constants";
const IndexScreen = dynamic(() => import("~pages/Index"), { ssr: false });

const Index: NextPageWithLayout = () => (
  <>
    <Head>
      <title>Chainmart Việt Nam | Hệ thống siêu thị hàng đầu Việt Nam</title>
      <meta
        name="title"
        content="Chainmart Việt Nam | Hệ thống siêu thị hàng đầu Việt Nam"
      />
      <meta
        name="description"
        content="12.12 Siêu Sale Sinh Nhật - Giảm Sâu Đến 90%. Ngập Tràn Voucher. Đặt Hàng Ngay Hôm Nay! Ngày Siêu Sale Sinh Nhật 12.12. Xem ShopeLive Lấy Mã Freeship Đến 99K. Lướt Mua Hàng Ngay. Flash Sale 0H-9H-12H-21H. Gì Cũng Rẻ - Freeship 0Đ. X4 Ưu Đãi Siêu Khủng."
      />
      <meta
        property="og:title"
        content="Chainmart Việt Nam | Hệ thống siêu thị hàng đầu Việt Nam"
      />
      <meta
        property="og:description"
        content="12.12 Siêu Sale Sinh Nhật - Giảm Sâu Đến 90%. Ngập Tràn Voucher. Đặt Hàng Ngay Hôm Nay! Ngày Siêu Sale Sinh Nhật 12.12. Xem ShopeLive Lấy Mã Freeship Đến 99K. Lướt Mua Hàng Ngay. Flash Sale 0H-9H-12H-21H. Gì Cũng Rẻ - Freeship 0Đ. X4 Ưu Đãi Siêu Khủng."
      />
      <meta property="og:image" content="/preview.jpg" />
      <meta property="og:image:width" content="800" />
      <meta property="og:image:height" content="600" />
    </Head>
    <IndexScreen />
  </>
);

Index.layout = MAIN_LAYOUT;

export default Index;
