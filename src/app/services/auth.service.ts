import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';



interface LoginResponse {
  access: string;
  refresh: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

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
    localStorage.removeItem('authToken');
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
