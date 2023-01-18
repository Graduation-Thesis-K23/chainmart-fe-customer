import React from "react";
import { MAIN_LAYOUT } from "~/constants";

import Page404Screen from "~pages/404";
import type { NextPageWithLayout } from "./_app";

const Page500: NextPageWithLayout = () => <Page404Screen />;

Page500.layout = MAIN_LAYOUT;

export default Page500;
