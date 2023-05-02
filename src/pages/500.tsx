import React from "react";
import { MAIN_LAYOUT } from "~/constants";
import dynamic from "next/dynamic";

const Page404Screen = dynamic(() => import("~pages/404"), { ssr: false });
import type { NextPageWithLayout } from "./_app";

const Page500: NextPageWithLayout = () => <Page404Screen />;

Page500.layout = MAIN_LAYOUT;

export default Page500;
