import React from "react";
import { MAIN_LAYOUT } from "~/constants";
import type { NextPageWithLayout } from "../_app";

const Profile: NextPageWithLayout = () => {
  return <p>profile</p>;
};

Profile.layout = MAIN_LAYOUT;

export default Profile;
