// src/app/register/register.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: false,
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
      role: ['employee'] // Default role is employee, can be changed to 'admin' if needed
    });
  }

  register() {
    this.http.post('http://localhost:5000/api/auth/register', this.registerForm.value)
      .subscribe((response: any) => {
        this.router.navigate(['/login']);
      }, error => {
        console.error(error);
      });
  }
}