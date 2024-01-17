import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthRedirectService {
  constructor(private route: Router) {}
  redirectLogin() {
    return this.route.navigate(['login']);
  }
}
