import { Component, OnInit } from '@angular/core';
import { ProductsView } from '../products-view/products-view';
import { ProductProviderService } from '../../service/product-provider-service';
import { NgbCarouselConfig, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { CardNameView } from '../card-name-view/card-name-view';
import { CommonModule } from '@angular/common';
import { Category } from '../../domain/category';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ProductsView, NgbCarouselModule, CardNameView, CommonModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
  providers: [NgbCarouselConfig],
})
export class HomePage implements OnInit {
  categories: Category[] = [];
  firstSlideCategories: Category[] = [];
  secondSlideCategories: Category[] = [];

  constructor(private productService: ProductProviderService, config: NgbCarouselConfig) {
    // config.showNavigationIndicators = false;
  }

  ngOnInit() {
    this.loadCategories();
    this.productService.getAllCategories();
  }

  private loadCategories() {
    this.productService.categories$.subscribe({
      next: (categories: Category[]) => {
        this.categories = categories.slice(0, 8);
        const midPoint = Math.ceil(this.categories.length / 2);
        this.firstSlideCategories = this.categories.slice(0, midPoint);
        this.secondSlideCategories = this.categories.slice(midPoint);
      },
    });
  }
}
