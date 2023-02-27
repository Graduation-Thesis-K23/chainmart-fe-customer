export interface Address {
  address: string;
  name: string;
  df: boolean;
  street: string;
  phone: string;
}

export interface AddressKey extends Address {
  key: number;
}

export interface SelectOption {
  value: string;
  label: string;
}
