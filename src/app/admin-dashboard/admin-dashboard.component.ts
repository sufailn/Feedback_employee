// frontend/src/app/admin-dashboard/admin-dashboard.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  standalone: false,
})
export class AdminDashboardComponent {
  employees: any[] = [];

  constructor(private http: HttpClient) {
    this.loadEmployees();
  }

  loadEmployees() {
    this.http.get('http://localhost:5000/api/employees')
      .subscribe((data: any) => {
        this.employees = data;
      }, error => {
        console.error(error);
      });
  }

  editEmployee(employee: any) {
    // Implement edit logic here
    alert(`Editing employee: ${employee.name}`);
  }

  deleteEmployee(employee: any) {
    if (confirm(`Are you sure you want to delete ${employee.name}?`)) {
      this.http.delete(`http://localhost:5000/api/employees/${employee.id}`)
        .subscribe(() => {
          this.loadEmployees(); // Reload employees after deletion
          alert('Employee deleted successfully');
        }, error => {
          console.error(error);
          alert('An error occurred while deleting the employee');
        });
    }
  }
}