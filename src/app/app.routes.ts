import { Routes } from '@angular/router';
import { LoginPage } from './component/login-page/login-page';
import { NotFound } from './component/not-found/not-found';
import { HomePage } from './component/home-page/home-page';
import { CartPage } from './component/cart-page/cart-page';
import { WishlistPage } from './component/wishlist-page/wishlist-page';
import { ProductPage } from './component/product-page/product-page';
import { CategoriesPage } from './component/categories-page/categories-page';
import { BrandsPage } from './component/brands-page/brands-page';
import { authGuard, loginGuard } from './service/auth-gaurd';
import { ProductsPage } from './component/products-page/products-page';

export const routes: Routes = [
  { path: 'login', component: LoginPage, canActivate: [loginGuard] },
  { path: 'home', component: HomePage, canActivate: [authGuard] },
  { path: 'cart', component: CartPage, canActivate: [authGuard] },
  { path: 'wishlist', component: WishlistPage, canActivate: [authGuard] },
  { path: 'products', component: ProductsPage, canActivate: [authGuard] },
  { path: 'products/:productId', component: ProductPage, canActivate: [authGuard] },
  { path: 'categories', component: CategoriesPage, canActivate: [authGuard] },
  { path: 'brands', component: BrandsPage, canActivate: [authGuard] },
  { path: 'not-found', component: NotFound },
  { path: '', redirectTo: 'not-found', pathMatch: 'full' },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];
