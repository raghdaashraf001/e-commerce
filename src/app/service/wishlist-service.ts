import { Injectable, signal } from '@angular/core';
import { WishList } from '../domain/wish-list';
import { toObservable } from '@angular/core/rxjs-interop';
import { NetworkService } from './network-service';
import { Product } from '../domain/product';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private static BASE_URL = 'https://ecommerce.routemisr.com/api/v1/wishlist';

  private emptyWishList: WishList = {
    data: [],
  };

  private wishList = signal(this.emptyWishList);
  wishList$ = toObservable(this.wishList);

  private likedProducts = signal(new Set<string>());
  likedProducts$ = toObservable(this.likedProducts);

  constructor(private networkService: NetworkService) {}

  addToWishList(product: Product): void {
    this.networkService
      .post<WishList>(WishlistService.BASE_URL, { productId: product._id }, true)
      .subscribe({
        next: (wishlist: WishList) => {
          this.wishList.update((current) => {
            current.data.push(product);
            return current;
          });
          this.likedProducts.update((current) => current.add(product._id));
        },
      });
  }

  removeFromWishList(productId: string): void {
    this.networkService
      .delete<WishList>(`${WishlistService.BASE_URL}/${productId}`, true)
      .subscribe({
        next: (data: any) => {
          if (data.status !== 'success') {
            return;
          }
          this.wishList.update((current) => {
            current.data = current.data.filter((product) => product._id !== productId);
            return current;
          });
          this.likedProducts.update((current) => {
            current.delete(productId);
            return current;
          });
        },
      });
  }

  getWishList() {
    if (this.wishList().data.length > 0) {
      return;
    }
    this.networkService.get<WishList>(WishlistService.BASE_URL, true).subscribe({
      next: (wishlist: WishList) => {
        this.wishList.set(wishlist);
        this.updateLikedProducts(wishlist.data);
      },
    });
  }

  private updateLikedProducts(prducts: Product[]): void {
    let updatedLikedProducts = new Set<string>();
    for (const item of prducts) {
      updatedLikedProducts.add(item._id);
    }
    this.likedProducts.set(updatedLikedProducts);
  }

  isProductLiked(productId: string): boolean {
    return this.likedProducts().has(productId);
  }
}
