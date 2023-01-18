import { ParsedUrlQuery } from "querystring";

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
