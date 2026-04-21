import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthResponse } from '../models/models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://127.0.0.1:8000/api';
  private usernameKey = 'username';

  constructor(private http: HttpClient, private router: Router) {}

  register(data: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register/`, data);
  }

  login(data: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login/`, data);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem(this.usernameKey);
    this.router.navigate(['/login']);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  saveUsername(username: string) {
    localStorage.setItem(this.usernameKey, username);
  }

  getUsername() {
    return localStorage.getItem(this.usernameKey);
  }

  isLoggedIn() {
    return !!this.getToken();
  }
}
