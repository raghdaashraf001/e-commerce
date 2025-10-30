import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from './component/nav-bar/nav-bar';
import { UserAuthentication } from './service/user-authentication';
import { Footer } from './component/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('e-commerce');

  constructor(private authService: UserAuthentication) {}

  ngOnInit() {
    this.authService.checkLoginStatus();
  }
}
