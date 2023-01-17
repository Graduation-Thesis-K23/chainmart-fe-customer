import React from "react";
import type { NextPageWithLayout } from "./_app";

import Page404Screen from "~pages/404";
import { MAIN_LAYOUT } from "~/constants";

const Page404: NextPageWithLayout = () => <Page404Screen />;

Page404.layout = MAIN_LAYOUT;

export default Page404;
