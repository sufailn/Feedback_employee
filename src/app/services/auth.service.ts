// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';




@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: any) {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  register(user: any) {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  getCurrentUser() {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = token.split('.')[1];
      const decoded = window.atob(payload);
      return JSON.parse(decoded);
    }
    return null;
  }
}