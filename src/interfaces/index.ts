import { ParsedUrlQuery } from "querystring";

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
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
  maxQuantity: number;
  quantity: number;
}

export interface ErrorPayload {
  statusCode: number;
  message: string;
  error: string;
}

export interface SuccessPayload {
  status: string;
}

export interface SignInPayload {
  account: string;
  password: string;
}

export interface SignUpPayload {
  username: string;
  password: string;
  name: string;
  email: string;
}

export interface IParams extends ParsedUrlQuery {
  slug: string;
}

export interface Comment {
  id: string;
  name: string;
  createdAt: number;
  star: number;
  content?: string;
  avatar: string;
  images?: string[];
}
