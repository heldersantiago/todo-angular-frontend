import { Routes } from '@angular/router';
import { TodosComponent } from './todos/todos.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './Authentication/auth.guard';

export const routes: Routes = [
    { path: '', component: TodosComponent, canActivate: [authGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
];
    