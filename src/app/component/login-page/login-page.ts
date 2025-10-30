import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserAuthentication } from '../../service/user-authentication';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  constructor(private authService: UserAuthentication) {}

  onLogin(formData: { email: string; password: string }) {
    this.authService.login(formData.email, formData.password);
  }
}
