// frontend/src/app/login/login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false,
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required] // Add role field
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.http.post('http://localhost:5000/api/auth/login', this.loginForm.value)
        .subscribe((response: any) => {
          if (response.success) {
            localStorage.setItem('token', response.token);
            alert('Login successful');
            if (this.loginForm.value.role === 'admin') {
              this.router.navigate(['/admin-dashboard']);
            } else {
              this.router.navigate(['/employee-dashboard']);
            }
          } else {
            alert('Login failed: ' + response.message);
          }
        }, error => {
          console.error(error);
          alert('An error occurred during login');
        });
    }
  }
}