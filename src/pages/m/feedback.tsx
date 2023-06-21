import React from "react";
import Head from "next/head";

import { MAIN_LAYOUT } from "~/constants";
import type { NextPageWithLayout } from "../_app";
import FeedbackScreen from "~/components/m/Feedback";
import useTranslate from "~/hooks/useLocales";

const Feedbacks: NextPageWithLayout = () => (
  <>
    <Head>
      <title>{useTranslate("feedback")}</title>
    </Head>
    <FeedbackScreen />
  </>
);

Feedbacks.layout = MAIN_LAYOUT;

export default Feedbacks;
