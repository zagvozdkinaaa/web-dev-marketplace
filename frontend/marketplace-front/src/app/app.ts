import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav>
      <a routerLink="/products">Products</a> |
      <a routerLink="/products/add">Add Product</a> |
      <a routerLink="/login">Login</a> |
      <a routerLink="/register">Register</a> |
      <button (click)="logout()">Logout</button>
    </nav>
    <router-outlet />
  `
})
export class App {
  constructor(private auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}
