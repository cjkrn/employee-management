import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee, EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  @Input() employee: Employee | undefined;
  name=''
  email=''
  department=''
  joiningDate = new Date()

  departments = ['HR', 'Engineering'];
  @Output() employeeAdded : EventEmitter<void> = new EventEmitter();
  
  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {  }

  addEmployee() {
    debugger
    if (this.name && this.email && this.department && this.joiningDate) {
      this.employee={
        id: '',
        name: this.name,
        email: this.email,
        department: this.department,
        joiningDate: this.joiningDate.toString()
      }
      this.employeeService.addEmployee(this.employee).subscribe(() => {
        console.log('Employee added successfully');
        this.employeeAdded.emit();
      });
    } else {
      console.log('Please fill in all fields.');
    }
  }


}

