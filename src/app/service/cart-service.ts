import { Injectable, signal } from '@angular/core';
import { Cart, CartPostResponseData, CartResponse } from '../domain/cart';
import { ProductProviderService } from './product-provider-service';
import { NetworkService } from './network-service';
import { UserAuthentication } from './user-authentication';
import { Observable } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { Product } from '../domain/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private static BASE_URL = 'https://ecommerce.routemisr.com/api/v1/cart';

  private emptyCart: Cart = {
    products: [],
    totalCartPrice: 0,
    numOfCartItems: 0,
  };

  private cart = signal(this.emptyCart);
  cart$ = toObservable(this.cart);

  private cartCount = signal(0);
  cartCount$ = toObservable(this.cartCount);

  constructor(private networkService: NetworkService) {}

  addNewItemToCart(product: Product): void {
    this.networkService
      .post<CartPostResponseData>(CartService.BASE_URL, { productId: product._id }, true)
      .subscribe({
        next: (cartData: CartPostResponseData) => {
          this.cart.update((current) => {
            let newProduct = cartData.data.products.find((item) => item.product === product._id);
            if (!newProduct) {
              return current;
            }
            let existingProductIndex = current.products.findIndex(
              (item) => item.product._id === product._id
            );
            if (existingProductIndex === -1) {
              current.products.push({
                product: product,
                _id: newProduct._id,
                count: newProduct.count,
                price: newProduct.price,
              });
            } else {
              current.products[existingProductIndex].count = newProduct.count;
            }
            current.totalCartPrice = cartData.data.totalCartPrice;
            current.numOfCartItems = cartData.numOfCartItems;
            return current;
          });
          this.cartCount.set(cartData.numOfCartItems);
        },
      });
  }

  addExistingToCart(productId: string, newAmount: number): void {
    this.networkService
      .put<CartResponse>(`${CartService.BASE_URL}/${productId}`, { count: newAmount }, true)
      .subscribe({
        next: (cartData: CartResponse) => {
          let cart = {
            products: cartData.data.products,
            totalCartPrice: cartData.data.totalCartPrice,
            numOfCartItems: cartData.numOfCartItems,
          };
          this.cart.set(cart);
          this.cartCount.set(cartData.numOfCartItems);
        },
      });
  }

  removeFromCart(productId: string): void {
    this.networkService
      .delete<CartResponse>(`${CartService.BASE_URL}/${productId}`, true)
      .subscribe({
        next: (cartData: CartResponse) => {
          let cart = {
            products: cartData.data.products,
            totalCartPrice: cartData.data.totalCartPrice,
            numOfCartItems: cartData.numOfCartItems,
          };
          this.cart.set(cart);
          this.cartCount.set(cartData.numOfCartItems);
        },
      });
  }

  deleteCart(): void {
    this.networkService.delete<CartResponse>(CartService.BASE_URL, true).subscribe({
      next: (cartData: CartResponse) => {
        this.cart.set(this.emptyCart);
        this.cartCount.set(0);
      },
    });
  }

  getCart() {
    if (this.cart().products.length > 0) {
      return;
    }
    this.networkService.get<CartResponse>(CartService.BASE_URL, true).subscribe({
      next: (cartData: CartResponse) => {
        let cart = {
          products: cartData.data.products,
          totalCartPrice: cartData.data.totalCartPrice,
          numOfCartItems: cartData.numOfCartItems,
        };
        this.cart.set(cart);
        this.cartCount.set(cartData.numOfCartItems);
      },
    });
  }
}
