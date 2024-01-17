import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

// const token = localStorage.getItem('jwt')
const base_url = environment.api;

@Injectable({
  providedIn: 'root',
})
export class StateService {
  token = localStorage.getItem('_token');

  constructor(private http: HttpClient) {}
  get(endpoint: string) {
    return this.http.get(base_url + endpoint, { headers: this.headers() });
  }

  post(endpoint: string, data: any) {
    return this.http.post(base_url + endpoint, data, {
      headers: this.headers(),
    });
  }

  delete(endpoint: string) {
    return this.http.delete(base_url + endpoint, { headers: this.headers() });
  }

  private headers(): HttpHeaders {
    // Define custom headers if needed
    const _headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    return _headers;
  }
}
