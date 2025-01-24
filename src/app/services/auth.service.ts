import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LocalStorageService } from './localstorage.service';



interface LoginResponse {
  access: string;
  refresh: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.api}/auth/login/`, credentials).pipe(
      tap((response: any) => {
        // Guarda el token en localStorage
        localStorage.setItem('authToken', response.access);
        localStorage.setItem('refreshToken', response.refresh);
      })
    );
  }

  logout(): void {
    if (this.localStorageService.isLocalStorageAvailable()){
      localStorage.removeItem('authToken');
    }
  }

  getToken(): string | null {
    if (this.localStorageService.isLocalStorageAvailable()){
      return localStorage.getItem('authToken');
    }
    return null
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
