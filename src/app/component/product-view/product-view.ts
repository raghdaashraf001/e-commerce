import { Component, input, Input } from '@angular/core';
import { Product } from '../../domain/product';
import { CartService } from '../../service/cart-service';
import { WishlistService } from '../../service/wishlist-service';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TitleWordsPipe } from '../../pipe/title-words.pipe';
import { NgClass } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [FontAwesomeModule, TitleWordsPipe, NgClass, RouterModule],
  templateUrl: './product-view.html',
  styleUrl: './product-view.css',
})
export class ProductView {
  @Input() product!: Product;
  @Input() liked: boolean = false;

  heartIcon = faHeart;
  starIcon = faStar;

  constructor(private cartService: CartService, private wishListService: WishlistService) {}

  addToCart(): void {
    this.cartService.addNewItemToCart(this.product);
  }

  addToWishlist(): void {
    if (this.liked) {
      this.wishListService.removeFromWishList(this.product._id);
      return;
    }
    this.wishListService.addToWishList(this.product);
  }
}
