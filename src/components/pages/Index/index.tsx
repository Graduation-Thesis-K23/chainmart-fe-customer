import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";

import MainLayout from "~/components/layouts/MainLayout";
import Loading from "~/components/atomics/Loading";

const Stardust = dynamic(() => import("./components/Stardust"));
const Category = dynamic(() => import("./components/Categories"));
const Products = dynamic(() => import("./components/Products"));
const AdsImages = dynamic(() => import("./components/AdsImages"));

const Index = () => {
  return (
    <MainLayout>
      <Suspense fallback={<Loading />}>
        <Stardust />
        <Category />
        <Products />
        <AdsImages />
      </Suspense>
    </MainLayout>
  );
};

export default Index;
