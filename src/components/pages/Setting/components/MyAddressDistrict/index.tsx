import React, { memo, useEffect, useState } from "react";
import { Control } from "react-hook-form";

import MyAddressSelect from "../MyAddressSelect";
import Location from "~/dataSources/Location.json";
import { SelectOption } from "../../interfaces";

const MyAddressDistrict: React.FC<{
  labelKey: string;
  icon: JSX.Element;
  control: Control<{
    name: string;
    phone: string;
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
  city: string;
}> = (props) => {
  const [options, setOptions] = useState<Array<SelectOption>>([]);

  useEffect(() => {
    const cityItems = Location.find((item) => item.name === props.city);

    if (cityItems) {
      const districtList = cityItems.level2s.map((item) => ({
        value: item.name,
        label: item.name,
      }));

      setOptions(districtList);
    }
  }, [props.city]);

  return <MyAddressSelect {...props} options={options} />;
};

export default memo(MyAddressDistrict);
