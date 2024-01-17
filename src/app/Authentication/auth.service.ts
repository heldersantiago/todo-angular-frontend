import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';

const base_url = environment.auth;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private message: any;
  token = localStorage.getItem('_token');

  constructor(private http: HttpClient, private route: Router) {}

  isAuthenticated(): boolean {
    if (this.token) return true;
    return false;
  }

  authenticateSession(data: any): any {
    this.http.post(base_url + '/login', data).subscribe((r: any) => {
      this.message = r;
      if (r) {
        const jwt = r.data.message;
        localStorage.setItem('_token', jwt);
        return r;
      }
    });
    return this.message;
  }

  registerSession(data: any): any {
    this.http
      .post<any>(base_url + '/register', data)
      .pipe(
        catchError((_error) => {
          console.log('Peguei');
          this.route.navigate(['/'])
          console.log(_error.error.message);

          this.message = _error.error.message;
          throw _error;
        })
      )
      .subscribe((response) => {
        console.log(response);
        return (this.message = response);
      });
  }
}
