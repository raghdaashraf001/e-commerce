import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserAuthentication } from '../../service/user-authentication';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../../service/cart-service';

@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {
  isLoggedIn: boolean = false;
  numberOfItemsInCart: number = 0;
  cartIcon = faCartShopping;

  constructor(public userAuthService: UserAuthentication, private cartService: CartService) {}

  ngOnInit(): void {
    this.userAuthService.isLoggedIn$.subscribe((status) => {
      let oldStatus = this.isLoggedIn;
      this.isLoggedIn = status;
      if (this.isLoggedIn && !oldStatus) {
        this.cartService.getCart();
      }
    });
    this.cartService.cartCount$.subscribe((count) => {
      this.numberOfItemsInCart = count;
    });
  }
}
