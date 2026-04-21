import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  template: `
    <nav>
      <ng-container *ngIf="auth.isLoggedIn()">
        <a routerLink="/products">Products</a>
        <a routerLink="/products/add">Add product</a>
        <a routerLink="/orders">My orders</a>
        <a routerLink="/cart">Cart</a>
        <button (click)="auth.logout()">Logout</button>
      </ng-container>
      <ng-container *ngIf="!auth.isLoggedIn()">
        <a routerLink="/login">Login</a>
        <a routerLink="/register">Register</a>
      </ng-container>
    </nav>
    <router-outlet />
  `
})
export class App {
  constructor(public auth: AuthService) {}
}
