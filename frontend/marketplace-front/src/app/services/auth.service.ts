import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://127.0.0.1:8000/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  register(data: any) {
    return this.http.post(`${this.baseUrl}/register/`, data);
  }

  login(data: any) {
    return this.http.post<any>(`${this.baseUrl}/login/`, data);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return !!this.getToken();
  }
}
