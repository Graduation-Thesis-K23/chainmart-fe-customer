import Head from "next/head";
import React, { ReactElement, Suspense } from "react";
import dynamic from "next/dynamic";
import type { NextPageWithLayout } from "./_app";

import MainLayout from "~layouts/MainLayout";
import Loading from "~atomics/Loading";
const IndexScreen = dynamic(() => import("~pages/Index"));

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
      <meta property="og:image" content="/banner1.png" />
    </Head>
    <Suspense fallback={<Loading />}>
      <IndexScreen />
    </Suspense>
  </>
);

Index.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;

export default Index;
