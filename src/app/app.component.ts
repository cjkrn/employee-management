import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeService } from './services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Employee Management';
  employees: Employee[] = [];
  selectedEmployee: Employee = { id: '', name: '', email: '', department: '', joiningDate: '' }
  selectedDepartment: string = ''; 
  uniqueDepartments: string[] = [];
  isDropdownOpen: boolean = false; 
  showCard: boolean = false;
  showAddComp: boolean = false;
  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (data: Employee[]) => {
        this.employees = data;
        this.uniqueDepartments = this.getUniqueDepartments(data);
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }
  getUniqueDepartments(employees: Employee[]): string[] {
    const departments = employees.map(employee => employee.department);
    return Array.from(new Set(departments));
  }

  onEmployeeSelected(employee: Employee): void {
    this.selectedEmployee = employee; 
    this.showCard = true
  }

  onEmployeeChange() {
    this.showCard = false
    this.showAddComp  = false
    this.fetchEmployees() ; 
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
