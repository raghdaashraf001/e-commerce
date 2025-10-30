import { Component } from '@angular/core';
import { ProductProviderService } from '../../service/product-provider-service';
import { Brand } from '../../domain/brand';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CardNameView } from '../card-name-view/card-name-view';

@Component({
  selector: 'app-brands-page',
  imports: [CommonModule, CardNameView],
  templateUrl: './brands-page.html',
  styleUrl: './brands-page.css',
})
export class BrandsPage {
  brands$: Observable<Brand[]>;

  constructor(private productsService: ProductProviderService) {
    this.brands$ = this.productsService.brands$;
  }

  ngOnInit() {
    this.productsService.getAllBrands();
  }
}
