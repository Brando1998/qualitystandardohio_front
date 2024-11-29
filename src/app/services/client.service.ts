import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) { }

  placeOrder(data: any): Observable<any> {
    return this.http.post(`${this.api}/client/service-orders/`, data);
  }

  getOrders(): Observable<any> {
    return this.http.get(`${this.api}/client/service-orders/`);
  }
}
