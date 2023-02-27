import React, { memo, useEffect, useState } from "react";
import { Control } from "react-hook-form";

import MyAddressSelect from "../MyAddressSelect";
import Location from "~/dataSources/Location.json";
import { SelectOption } from "../../interfaces";

const MyAddressWard: React.FC<{
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
  district: string;
  city: string;
}> = (props) => {
  const [options, setOptions] = useState<Array<SelectOption>>([]);

  const { city, district } = props;

  useEffect(() => {
    const cityItems = Location.find((item) => item.level1_id === city);
    const districtItems = cityItems?.level2s.find(
      (item) => item.level2_id === district
    );

    const wardList = districtItems?.level3s.map((item) => ({
      value: item.level3_id,
      label: item.name,
    }));

    if (wardList) {
      setOptions(wardList);
    }
  }, [city, district]);

  return <MyAddressSelect {...props} options={options} />;
};

export default memo(MyAddressWard);
