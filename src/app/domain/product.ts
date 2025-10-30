import { Brand } from './brand';
import { Category } from './category';
import { Subcategory } from './sub-category';

export interface Product {
  _id: string;
  sold: number;
  images: string[];
  subcategory: Subcategory[];
  ratingsQuantity: number;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface ProductResponse {
  data: Product;
}
