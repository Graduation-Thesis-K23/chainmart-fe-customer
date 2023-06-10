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
  select: { [key: string]: string };
}

export interface SignInPayload {
  username: string;
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

interface CommentImage {
  id: number;
  src: string;
}

export interface Comment {
  id: number;
  productId: number;
  name: string;
  timestamp: number;
  star: number;
  content?: string;
  avatar: string;
  like: number;
  classify: string;
  images?: Array<CommentImage>;
}
