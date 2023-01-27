export interface IProduct {
  id: number;
  name: string;
  price: number;
  ignorePrice: number;
  star: number;
  sold: number;
  image: string;
  label?: number;
  slug: string;
}

export interface FamiliarProduct {
  id: number;
  name: string;
  price: number;
  ignorePrice: number;
  image: string;
  slug: string;
}

export interface IProductDetail {
  id: number;
  name: string;
  price: number;
  ignorePrice: number;
  star: number;
  sold: number;
  images: string[];
  image: string;
  slug: string;
  options: object;
  maxQuantity: number;
  specifications: { [key: string]: string };
  description: string;
  familiar: Array<FamiliarProduct>;
}

export interface ICart {
  id: number;
  name: string;
  price: number;
  image: string;
  slug: string;
  maxQuantity: number;
  quantity: number;
  classify: { [key: string]: string };
}
