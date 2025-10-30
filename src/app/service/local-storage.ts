import { Injectable } from '@angular/core';
import { CookieOptions, CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorage {
  constructor(private cookieService: CookieService) {}

  setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  setCookie(key: string, value: string, options?: CookieOptions) {
    this.cookieService.set(key, value, options);
  }

  getItem(key: string) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  getCookie(key: string) {
    return this.cookieService.get(key);
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  removeCookie(key: string) {
    this.cookieService.delete(key);
  }
}
