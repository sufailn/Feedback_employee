import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { ReviewComponent } from './review/review.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminDashboardComponent,
    EmployeeDashboardComponent,
    RegisterComponent,
    ReviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatTableModule,
    RouterModule.forRoot([]),
    RouterModule,
    CommonModule,
    ReactiveFormsModule, 
    MatInputModule, 
    MatButtonModule

  ],
  providers: [
    AuthService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent] // Ensure AppComponent is bootstrapped
})
export class AppModule { }