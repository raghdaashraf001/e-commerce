import { Injectable, signal } from '@angular/core';
import { LocalStorage } from './local-storage';
import { toObservable } from '@angular/core/rxjs-interop';
import { UserCredentials } from '../domain/user-credentials';
import { Router } from '@angular/router';
import { NetworkService } from './network-service';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserAuthentication {
  private isLoggedIn = signal(false);
  isLoggedIn$ = toObservable(this.isLoggedIn);

  private static BASE_URL = 'https://ecommerce.routemisr.com/api/v1/auth';
  private static LOGIN_URL = `${UserAuthentication.BASE_URL}/signin`;
  private static VERIFY_TOKEN_URL = `${UserAuthentication.BASE_URL}/verifyToken`;
  private static cookieTokenKey = 'Token';
  private static cookieDomain = 'localhost'; // For local development
  private static cookieOptions = {
    domain: UserAuthentication.cookieDomain,
    path: '/',
    sameSite: 'Lax' as const,
    secure: true,
  };

  constructor(
    private networkService: NetworkService,
    private localStorage: LocalStorage,
    private router: Router
  ) {}

  getStoredToken(): string | null {
    return this.localStorage.getCookie(UserAuthentication.cookieTokenKey);
  }

  private verifyToken(): Observable<boolean> {
    return this.networkService.get(UserAuthentication.VERIFY_TOKEN_URL, true).pipe(
      tap((response: any) => {
        if (response && response?.message === 'verified') {
          this.handleSuccessfulVerification();
        } else {
          this.handleFailedAuth();
        }
      })
    );
  }

  private handleSuccessfulVerification() {
    if (!this.isLoggedIn()) {
      console.log('Token verified successfully.');
      this.isLoggedIn.set(true);
    }
  }

  private handleSuccessfulAuth(token: string) {
    this.localStorage.setCookie(
      UserAuthentication.cookieTokenKey,
      token,
      UserAuthentication.cookieOptions
    );
    this.isLoggedIn.set(true);
  }

  private handleFailedAuth() {
    this.logout();
  }

  login(email: string, password: string) {
    if (this.isLoggedIn() && this.getStoredToken()) {
      console.log('User already logged in.');
      return;
    }

    const userCreds = new UserCredentials(email, password);
    this.networkService
      .post(UserAuthentication.LOGIN_URL, userCreds)
      .pipe(
        tap({
          next: (response: any) => {
            if (response?.token) {
              this.handleSuccessfulAuth(response.token);
              this.router.navigate(['/home']);
              console.log('Login successful! Navigating to home page.');
            }
          },
          error: (error) => {
            console.error('Login failed:', error);
            this.handleFailedAuth();
            throw error;
          },
        })
      )
      .subscribe();
  }

  logout() {
    if (!this.isLoggedIn()) {
      console.log('No user is currently logged in.');
      return;
    }

    this.localStorage.removeCookie(UserAuthentication.cookieTokenKey);
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }

  getLoginStatus(): boolean {
    return Boolean(this.getStoredToken());
  }

  checkLoginStatus() {
    const token = this.getStoredToken();
    const loggedIn = Boolean(token);
    if (loggedIn) {
      this.verifyToken().subscribe();
    } else {
      this.isLoggedIn.set(false);
    }
  }
}
