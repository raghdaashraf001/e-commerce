import { Component } from '@angular/core';
import { ProductProviderService } from '../../service/product-provider-service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Category } from '../../domain/category';
import { CardNameView } from '../card-name-view/card-name-view';

@Component({
  selector: 'app-categories-page',
  imports: [CommonModule, CardNameView],
  templateUrl: './categories-page.html',
  styleUrl: './categories-page.css',
  standalone: true,
})
export class CategoriesPage {
  categories$: Observable<Category[]>;

  constructor(private productsService: ProductProviderService) {
    this.categories$ = this.productsService.categories$;
  }

  ngOnInit() {
    this.productsService.getAllCategories();
  }
}
