import { CartItem, CartItemPostResponse } from './cart-item';

export interface Cart {
  products: CartItem[];
  totalCartPrice: number;
  numOfCartItems: number;
}

export interface CartResponse {
  numOfCartItems: number;
  data: Cart;
}

export interface CartPostResponse {
  products: CartItemPostResponse[];
  totalCartPrice: number;
  numOfCartItems: number;
}

export interface CartPostResponseData {
  numOfCartItems: number;
  data: CartPostResponse;
}
