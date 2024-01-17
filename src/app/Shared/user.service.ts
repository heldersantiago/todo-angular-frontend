import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  private getToken(): string | null {
    return localStorage.getItem('_token');
  }

  userInfo() {
    const _token = this.getToken();

    if (_token) {
      try {
        const [header, payload, signature] = _token.split('.');
        const decodedPayload = JSON.parse(atob(payload));
        return decodedPayload;
      } catch (error) {
        console.error('Error decoding token:', error);
        return null; // Handle decoding error gracefully
      }
    }

    return null; // Handle the case when the token is not present
  }

  userId(): string {
    const userInfo = this.userInfo();
     return userInfo ? userInfo['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] : '';
  }

  userEmail(): string | null {
    const userInfo = this.userInfo();
    return userInfo ? userInfo.Email : null;
  }

  userName(): string | null {
    const userEmail = this.userEmail();

    if (userEmail) {
      const atIndex = userEmail.indexOf('@');
      return atIndex !== -1 ? userEmail.substring(0, atIndex) : userEmail;
    } else {
      // Handle the case when userEmail is null
      console.error('Invalid email format');
      return null;
    }
  }
}
