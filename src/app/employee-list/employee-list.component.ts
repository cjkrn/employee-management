import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { EmployeeService, Employee } from '../services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  filteredEmployees = new MatTableDataSource<Employee>();
  displayedColumns: string[] = ['name', 'email', 'department', 'joiningDate', 'view'];
  selectedDepartment: string = '';
  @Input() employees: Employee[] = [];
  @Output() employeeSelected: EventEmitter<Employee> = new EventEmitter();
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    // this.fetchEmployees();
    this.filteredEmployees.sort = this.sort;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employees'] && changes['employees'].currentValue) {
      this.filteredEmployees.data = this.employees;
    }
  }

  // fetchEmployees(): void {
  //   this.employeeService.getEmployees().subscribe(
  //     (data: Employee[]) => {
  //       console.log('Fetched employees:', data);  
  //       this.employees = data;
  //       this.filteredEmployees.data = this.employees; 
  //     },
  //     (error) => {
  //       console.error('Error fetching employees:', error);
  //     }
  //   );
  // }

  applyFilter(): void {
    this.filteredEmployees.data = this.selectedDepartment
      ? this.employees.filter(employee => employee.department === this.selectedDepartment)
      : this.employees;
  }

  onDepartmentChange(): void {
    this.applyFilter();
  }

  viewEmployee(employee: Employee): void {
    this.employeeSelected.emit(employee);
  }
}
