import { Component } from '@angular/core';
import { CartService } from '../../service/cart-service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { faShoppingCart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Product } from '../../domain/product';
import { CartItem } from '../../domain/cart-item';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  imports: [NgbModule, CommonModule, FontAwesomeModule, RouterModule],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.css',
})
export class CartPage {
  iconTrash = faTrash;
  iconShoppingCart = faShoppingCart;

  constructor(protected cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCart();
    this.cartService.cart$.subscribe();
  }

  addOneToItem(item: CartItem): void {
    const newAmount = item.count + 1;
    this.cartService.addExistingToCart(item.product._id, newAmount);
  }

  removeOneFromItem(item: CartItem): void {
    const newAmount = item.count - 1;
    if (newAmount > 0) {
      this.cartService.addExistingToCart(item.product._id, newAmount);
    } else {
      this.removeItem(item);
    }
  }

  removeItem(item: CartItem): void {
    this.cartService.removeFromCart(item.product._id);
  }

  clearCart(): void {
    this.cartService.deleteCart();
  }
}
