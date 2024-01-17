import { Component } from '@angular/core';
import { HeaderComponent } from '../partials/header/header.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../Authentication/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';

const base_url = environment.auth;

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HeaderComponent, FormsModule, CommonModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  title: string = 'Criar uma conta';
  message: any;
  data: any;
  token = localStorage.getItem('_token');
  authenticated: boolean = this.token ? true : false;

  feebackErrorMessage: any = '';
  feebackSuccessMessage = '';
  constructor(
    private http: HttpClient,
    private route: Router
  ) {}

  OnRegister(form: any) {
    this.data = {
      UserName: form.name,
      Email: form.email,
      Password: form.password,
      ConfirmPassword: form.confirmPassword,
    };

    this.http
      .post<any>(base_url + '/register', this.data)
      .pipe(
        catchError((_error) => {
          console.log('Peguei');
          this.feebackErrorMessage =
            _error.error.message + '/' + _error.error.errors;
          console.log(_error.error);
          throw _error;
        })
      )
      .subscribe((response) => {
        console.log(response);
        // return (this.message = response);
        this.route.navigate(['/']);
      });

    // this.message = this.authservice.registerSession(this.data);
  }
}
