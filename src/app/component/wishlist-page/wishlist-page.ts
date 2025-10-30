import { Component } from '@angular/core';
import { WishlistService } from '../../service/wishlist-service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { faHeart, faShoppingCart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { CartService } from '../../service/cart-service';
import { Product } from '../../domain/product';

@Component({
  selector: 'app-wishlist-page',
  imports: [NgbModule, CommonModule, FontAwesomeModule, RouterModule],
  templateUrl: './wishlist-page.html',
  styleUrl: './wishlist-page.css',
})
export class WishlistPage {
  iconTrash = faTrash;
  iconHeart = faHeart;
  iconShoppingCart = faShoppingCart;

  constructor(protected wishlistService: WishlistService, private cartService: CartService) {}

  ngOnInit(): void {
    this.wishlistService.getWishList();
  }

  removeFromWishlist(productId: string): void {
    this.wishlistService.removeFromWishList(productId);
  }

  addToCart(product: Product): void {
    this.cartService.addNewItemToCart(product);
    this.removeFromWishlist(product._id);
  }
}
