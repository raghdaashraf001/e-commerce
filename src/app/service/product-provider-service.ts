import { Injectable, signal } from '@angular/core';
import { Product, ProductResponse } from '../domain/product';
import { Brand } from '../domain/brand';
import { Category } from '../domain/category';
import { NetworkService } from './network-service';
import { PaginatedResponse } from '../domain/paginated-respons';
import { Observable } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ProductProviderService {
  private static productsBaseUrl = 'https://ecommerce.routemisr.com/api/v1/products';
  private static categoriesBaseUrl = 'https://ecommerce.routemisr.com/api/v1/categories';
  private static brandsBaseUrl = 'https://ecommerce.routemisr.com/api/v1/brands';

  private categories = signal<Category[]>([]);
  categories$ = toObservable(this.categories);

  private brands = signal<Brand[]>([]);
  brands$ = toObservable(this.brands);

  constructor(private networkService: NetworkService) {}

  getAllProducts(): Observable<PaginatedResponse<Product>> {
    return this.networkService.get<PaginatedResponse<Product>>(
      ProductProviderService.productsBaseUrl
    );
  }

  getProductById(id: string): Observable<ProductResponse> {
    let url = `${ProductProviderService.productsBaseUrl}/${id}`;
    return this.networkService.get<ProductResponse>(url);
  }

  // getProductsByCategory(categoryId: string): Product[] {
  //   return this.productList.filter((product) => product.categoryId === categoryId);
  // }

  // getProductsByBrand(brandId: string): Product[] {
  //   return this.productList.filter((product) => product.brandId === brandId);
  // }

  getAllCategories() {
    if (this.categories().length > 0) {
      return;
    }
    this.networkService
      .get<PaginatedResponse<Category>>(ProductProviderService.categoriesBaseUrl)
      .subscribe({
        next: (categories) => {
          this.categories.set(categories.data);
        },
      });
  }

  getAllBrands() {
    this.networkService
      .get<PaginatedResponse<Brand>>(ProductProviderService.brandsBaseUrl)
      .subscribe({
        next: (brands) => {
          this.brands.set(brands.data);
        },
      });
  }
}
