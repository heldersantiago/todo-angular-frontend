import { CanActivateFn, Router } from '@angular/router';
import { AuthRedirectService } from '../Redirects/auth-redirect.service';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('_token');
  if (token) {
    return true;
  }
  // Redirect to Login Page if user is not Authenticated
  const redirectUrl = new AuthRedirectService(new Router()).redirectLogin();
  return redirectUrl;
};
