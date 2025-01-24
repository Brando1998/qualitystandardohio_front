import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private BASE_URL = 'http://api.geonames.org';
  private USERNAME = 'brando21';

  constructor(private http: HttpClient) {}

  getStates(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/searchJSON`, {
      params: {
        country: 'US',
        featureClass: 'A', // Administrative regions
        featureCode: 'ADM1', // First-level administrative divisions (states)
        maxRows: '100',
        username: this.USERNAME
      }
    });
  }

  getCitiesByState(state: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/searchJSON`, {
      params: {
        country: 'US',
        adminCode1: state, // State code (e.g., "CA" for California)
        featureClass: 'P', // Populated places (cities, towns, etc.)
        maxRows: '100',
        username: this.USERNAME
      }
    });
  }  
}
