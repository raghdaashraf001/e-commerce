import { Component, OnInit } from '@angular/core';
import { ProductProviderService } from '../../service/product-provider-service';
import { ProductView } from '../product-view/product-view';
import { Product } from '../../domain/product';
import { WishlistService } from '../../service/wishlist-service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-products-view',
  standalone: true,
  imports: [ProductView, NgxSpinnerModule],
  templateUrl: './products-view.html',
  styleUrls: ['./products-view.css'],
})
export class ProductsView implements OnInit {
  products: Product[] = [];
  spinnerName = 'products-spinner';
  constructor(
    private productService: ProductProviderService,
    protected wishListService: WishlistService,
    private spinnerService: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinnerService.show(this.spinnerName);
    this.productService
      .getAllProducts()
      .subscribe((products) => {
        this.products = products.data;
      })
      .add(() => this.spinnerService.hide(this.spinnerName));

    this.wishListService.getWishList();
    this.wishListService.likedProducts$.subscribe();
  }
}
