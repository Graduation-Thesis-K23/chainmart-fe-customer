import React from "react";
import type { NextPageWithLayout } from "./_app";
import dynamic from "next/dynamic";

const Page404Screen = dynamic(() => import("~pages/404"), { ssr: false });
import { MAIN_LAYOUT } from "~/constants";

const Page404: NextPageWithLayout = () => <Page404Screen />;

Page404.layout = MAIN_LAYOUT;

export default Page404;
