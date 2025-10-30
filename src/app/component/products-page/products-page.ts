import { Component } from '@angular/core';
import { ProductsView } from '../products-view/products-view';

@Component({
  selector: 'app-products-page',
  imports: [ProductsView],
  templateUrl: './products-page.html',
  styleUrl: './products-page.css',
})
export class ProductsPage {}
