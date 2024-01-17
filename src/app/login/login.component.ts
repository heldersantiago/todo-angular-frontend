import { Component } from '@angular/core';
import { HeaderComponent } from '../partials/header/header.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { StateService } from '../Shared/state.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs';

const base_url = environment.auth;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    HeaderComponent,
    HttpClientModule,
    RouterModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  title: string = 'Login';
  userEmail: string = '';
  userPassword: string = '';

  data: any;
  Message: any = '';

  errorMessage: any = '';
  successMessage = '';
  token = localStorage.getItem('_token');
  authenticated: boolean = this.token ? true : false;

  constructor(private route: Router, private http: HttpClient) {}
 

  Login(form: any): any {
    this.userEmail = form.value.email;
    this.userPassword = form.value.password;

    if (!this.userEmail || !this.userPassword) {
      return (this.errorMessage = '*campo(s) vazio(s)');
    }

    this.data = {
      Email: this.userEmail,
      Password: this.userPassword,
    };

    this.http
      .post<any>(base_url + '/login', this.data)
      .pipe(
        catchError((_error) => {
          this.errorMessage =
            _error.error.message + '/' + _error.error.data.message;
          console.log(_error.error);
          throw _error;
        })
      )
      .subscribe((response) => {
        console.log(response);
        const jwt = response.data.message;
        localStorage.setItem('_token', jwt);
        this.route.navigate(['/']);
      });
  }
}
