import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductProviderService } from '../../service/product-provider-service';
import { Product } from '../../domain/product';
import { CartService } from '../../service/cart-service';
import { WishlistService } from '../../service/wishlist-service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { TitleWordsPipe } from '../../pipe/title-words.pipe';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, NgbCarouselModule, FontAwesomeModule, NgxSpinnerModule],
  templateUrl: './product-page.html',
  styleUrl: './product-page.css',
})
export class ProductPage implements OnInit {
  product: Product | null = null;
  heartIcon = faHeart;
  starIcon = faStar;
  isLiked = false;
  spinnerName = 'product-spinner';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductProviderService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private spinnerService: NgxSpinnerService
  ) {}

  ngOnInit() {
    const productId = this.route.snapshot.params['productId'];
    if (productId) {
      this.spinnerService.show(this.spinnerName);
      this.productService
        .getProductById(productId)
        .subscribe({
          next: (product) => {
            this.product = product.data;
            this.isLiked = this.wishlistService.isProductLiked(this.product._id);
          },
        })
        .add(() => {
          this.spinnerService.hide(this.spinnerName);
        });
    }
  }

  addToCart() {
    if (this.product) {
      this.cartService.addNewItemToCart(this.product);
    }
  }

  toggleWishlist() {
    if (!this.product) return;

    if (this.isLiked) {
      this.wishlistService.removeFromWishList(this.product._id);
    } else {
      this.wishlistService.addToWishList(this.product);
    }
    this.isLiked = !this.isLiked;
  }
}
