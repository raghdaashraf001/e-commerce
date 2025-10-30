import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorage } from './local-storage';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  private static tokenKey = 'Token';

  constructor(private http: HttpClient, private localStorage: LocalStorage) {}

  get<T>(url: string, includeToken?: boolean): Observable<T> {
    return this.http.get<T>(url, { headers: this.createHeaders(includeToken) });
  }

  post<T>(url: string, data: any, includeToken?: boolean): Observable<T> {
    return this.http.post<T>(url, data, { headers: this.createHeaders(includeToken) });
  }

  put<T>(url: string, data: any, includeToken?: boolean): Observable<T> {
    return this.http.put<T>(url, data, { headers: this.createHeaders(includeToken) });
  }

  delete<T>(url: string, includeToken?: boolean): Observable<T> {
    return this.http.delete<T>(url, { headers: this.createHeaders(includeToken) });
  }

  private createHeaders(includeToken?: boolean): HttpHeaders {
    let headers = new HttpHeaders();
    if (includeToken) {
      const token = this.localStorage.getCookie(NetworkService.tokenKey);
      if (token) {
        headers = headers.set(NetworkService.tokenKey, token);
      }
    }
    return headers;
  }
}
