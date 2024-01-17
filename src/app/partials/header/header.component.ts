import { HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../Shared/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HttpClientModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() title: string = '';
  @Input() authenticated: boolean = true;
  constructor(private route: Router, private userservice: UserService) {}
  Logout() {
    localStorage.removeItem('_token');
    this.route.navigate(['/login']);
  }
  useremail = this.userservice.userEmail();
  username = this.userservice.userName();
}
