import React, { memo, useEffect, useState } from "react";
import { Control } from "react-hook-form";

import MyAddressSelect from "../MyAddressSelect";
import Location from "~/dataSources/Location.json";

const MyAddressCity: React.FC<{
  labelKey: string;
  icon: JSX.Element;
  control: Control<{
    fullName: string;
    phoneNumber: string;
    city: string;
    district: string;
    ward: string;
    street: string;
  }>;
  name: "city" | "ward" | "district";
  disabled?: boolean;
  setStep: React.Dispatch<
    React.SetStateAction<{
      step: number;
      timestamp: number;
    }>
  >;
}> = (props) => {
  const [options, setOptions] = useState<
    Array<{ value: string; label: string }>
  >([]);

  useEffect(() => {
    const cityList = Location.map((item) => ({
      value: item.level1_id,
      label: item.name,
    }));

    setOptions(cityList);
  }, []);

  return <MyAddressSelect {...props} options={options} />;
};

export default memo(MyAddressCity);
