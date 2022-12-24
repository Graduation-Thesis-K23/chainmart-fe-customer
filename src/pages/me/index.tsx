import React from "react";
import type { NextPageWithLayout } from "../_app";

import MainLayout from "~layouts/MainLayout";

const Profile: NextPageWithLayout = () => {
  return <p>profile</p>;
};

Profile.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Profile;
